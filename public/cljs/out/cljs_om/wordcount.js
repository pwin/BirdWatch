// Compiled by ClojureScript 0.0-2202
goog.provide('cljs_om.wordcount');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.string');
cljs_om.wordcount.stop_words = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 202, ["itself",null,"us",null,"more",null,"didn't",null,"hers",null,"ours",null,"what's",null,"when's",null,"further",null,"we'll",null,"they'd",null,"his",null,"him",null,"hasn't",null,"how's",null,"are",null,"don't",null,"very",null,"you'd",null,"under",null,"who",null,"where's",null,"which",null,"we'd",null,"of",null,"this",null,"after",null,"once",null,"up",null,"off",null,"she",null,"shan't",null,"nor",null,"does",null,"here's",null,"theirs",null,"via",null,"yours",null,"not",null,"mustn't",null,"it",null,"over",null,"he'd",null,"by",null,"there's",null,"she's",null,"it's",null,"is",null,"few",null,"like",null,"gonna",null,"shouldn't",null,"why",null,"doing",null,"good",null,"http",null,"about",null,"they",null,"you",null,"new",null,"its",null,"than",null,"those",null,"where",null,"we're",null,"just",null,"for",null,"should",null,"they'll",null,"cannot",null,"my",null,"again",null,"themselves",null,"ourselves",null,"whom",null,"yourselves",null,"he'll",null,"they're",null,"because",null,"can't",null,"any",null,"most",null,"rt",null,"you've",null,"you're",null,"can",null,"were",null,"did",null,"was",null,"that",null,"if",null,"let",null,"same",null,"both",null,"says",null,"i'll",null,"i've",null,"doesn't",null,"don",null,"had",null,"til",null,"what",null,"an",null,"or",null,"she'll",null,"have",null,"couldn't",null,"am",null,"won't",null,"their",null,"a",null,"so",null,"them",null,"that's",null,"weren't",null,"upon",null,"on",null,"own",null,"above",null,"but",null,"amp",null,"when",null,"until",null,"be",null,"having",null,"out",null,"aren't",null,"say",null,"herself",null,"and",null,"i'm",null,"do",null,"myself",null,"i",null,"down",null,"here",null,"too",null,"one",null,"between",null,"such",null,"against",null,"she'd",null,"each",null,"how",null,"other",null,"from",null,"would",null,"want",null,"these",null,"while",null,"no",null,"with",null,"now",null,"some",null,"will",null,"himself",null,"all",null,"you'll",null,"wouldn't",null,"then",null,"isn't",null,"could",null,"through",null,"yourself",null,"has",null,"haven't",null,"&amp",null,"being",null,"our",null,"during",null,"who's",null,"shall",null,"before",null,"he's",null,"only",null,"your",null,"to",null,"into",null,"use",null,"i'd",null,"get",null,"htt\u2026",null,"why's",null,"we",null,"whose",null,"as",null,"we've",null,"said",null,"ought",null,"wasn't",null,"he",null,"me",null,"at",null,"below",null,"the",null,"let's",null,"they've",null,"her",null,"been",null,"there",null,"in",null,"hadn't",null], null), null);
cljs_om.wordcount.add_word = (function add_word(app,word){var prev_count_9528 = cljs.core.get.call(null,new cljs.core.Keyword(null,"words","words",1127222811).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,app)),word);cljs.core.swap_BANG_.call(null,app,cljs.core.assoc,new cljs.core.Keyword(null,"words-sorted-by-count","words-sorted-by-count",4739523959),cljs.core.disj.call(null,new cljs.core.Keyword(null,"words-sorted-by-count","words-sorted-by-count",4739523959).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,app)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",1014010321),word,new cljs.core.Keyword(null,"value","value",1125876963),prev_count_9528], null)));
cljs.core.swap_BANG_.call(null,app,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"words","words",1127222811),word], null),(cljs.core.get.call(null,new cljs.core.Keyword(null,"words","words",1127222811).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,app)),word) + 1));
cljs.core.swap_BANG_.call(null,app,cljs.core.assoc,new cljs.core.Keyword(null,"words-sorted-by-count","words-sorted-by-count",4739523959),cljs.core.conj.call(null,new cljs.core.Keyword(null,"words-sorted-by-count","words-sorted-by-count",4739523959).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,app)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",1014010321),word,new cljs.core.Keyword(null,"value","value",1125876963),(prev_count_9528 + 1)], null)));
return word;
});
cljs_om.wordcount.process_tweet = (function process_tweet(app,text){return cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__9533_SHARP_){return cljs_om.wordcount.add_word.call(null,app,p1__9533_SHARP_);
}),cljs.core.filter.call(null,(function (item){return !(cljs.core.contains_QMARK_.call(null,cljs_om.wordcount.stop_words,item));
}),cljs.core.map.call(null,(function (p1__9532_SHARP_){return clojure.string.replace.call(null,p1__9532_SHARP_,/[;:,\/‘’…~\-!?#<>()\"@.]+/,"");
}),cljs.core.map.call(null,clojure.string.lower_case,cljs.core.filter.call(null,(function (p1__9531_SHARP_){return (cljs.core.count.call(null,p1__9531_SHARP_) < 25);
}),cljs.core.filter.call(null,(function (p1__9530_SHARP_){return (cljs.core.count.call(null,p1__9530_SHARP_) > 3);
}),cljs.core.filter.call(null,(function (p1__9529_SHARP_){return cljs.core.not.call(null,cljs.core.re_find.call(null,/(@|https?:)/,p1__9529_SHARP_));
}),clojure.string.split.call(null,text,/[\s—\u3031-\u3035\u0027\u309b\u309c\u30a0\u30fc\uff70]+/)))))))));
});

//# sourceMappingURL=wordcount.js.map