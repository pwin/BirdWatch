(ns birdwatch-tc.main
  (:require [matthiasn.birdwatch-specs.specs]
            [birdwatch-tc.persistence.persistence :as pc]
            [birdwatch-tc.percolator.percolator :as perc]
            [birdwatch-tc.twitterclient.twitterclient :as tc]
            [matthiasn.systems-toolbox.switchboard :as sb]
            [matthiasn.systems-toolbox-kafka.kafka-producer :as kp]
            [matthiasn.systems-toolbox.scheduler :as sched]
            [clojure.edn :as edn]
            [clojure.tools.logging :as log]
            [io.aviso.logging :as pretty]
            [matthiasn.systemd-watchdog.core :as wd]
            [clj-pid.core :as pid])
  (:gen-class))

(pretty/install-pretty-logging)
(pretty/install-uncaught-exception-handler)

(defn restart!
  "Starts (or restarts) a system built out of the specified subsystems. The
   switchboard will then fire up subsystems according to the blueprint maps,
   which are in passed in the second position of the :cmd/init-comp vectors.
   These subsystems are then wired to provide the communication paths required
   by the application.
   The system can be restarted on the REPL. For example, say we modify the
   birdwatch.percolator.percolator namespace. Then, we can reload it:

      (require '[birdwatch-tc.percolator.percolator :as perc] :reload)

   Then, calling this function again will restart the system while maintaining
   the state of the individual subsystems."
  [conf]
  (let [switchboard (sb/component :tc/switchboard)
        kafka-cfg {:cfg (:kafka conf) :relay-types #{:perc/matches}}]
    (sb/send-mult-cmd
      switchboard
      [[:cmd/init-comp
        #{(tc/cmp-map :tc/client-cmp conf)
          (sched/cmp-map :tc/scheduler-cmp)
          (pc/cmp-map :tc/persistence-cmp conf)
          (kp/cmp-map :tc/kafka-prod kafka-cfg)
          (perc/cmp-map :tc/percolator-cmp conf)}]
       [:cmd/route {:from :tc/client-cmp :to #{:tc/persistence-cmp
                                               :tc/percolator-cmp}}]
       [:cmd/route {:from :tc/percolator-cmp
                    :to   #{:tc/interop-cmp :tc/kafka-prod}}]
       [:cmd/route {:from :tc/scheduler-cmp :to :tc/client-cmp}]

       [:cmd/send {:to  :tc/scheduler-cmp
                   :msg [:cmd/schedule-new
                         {:timeout 60000
                          :id      :schedule/t-conn-alive?
                          :message [:schedule/t-conn-alive?]
                          :repeat  true}]}]])))

(defn -main
  "Starts the application from command line. Also saves and logs process ID.
   The system that is fired up when start! is called proceeds in core.async's
   thread pool. Since we don't want the application to exit when just because
   the current thread is out of work, we just put it to sleep."
  [& args]
  (let [conf-filepath (get (System/getenv) "CONF_PATH" "twitterconf.edn")
        conf (edn/read-string (slurp conf-filepath))]
    (pid/save (:pidfile-name conf))
    (pid/delete-on-shutdown! (:pidfile-name conf))
    (log/info "Application started, PID" (pid/current))
    (restart! conf)
    (wd/start-watchdog! 5000)
    (Thread/sleep Long/MAX_VALUE)))
