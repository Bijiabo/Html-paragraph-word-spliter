/**
 * Created by huchunbo on 15/12/31.
 */
var html_paragraph_word_spliter = function(paragraphs) {

    var htmlTagRegexp = RegExp("\<[^\<\>]*\>[^\<\>]*\</[^\<\>]*\>|\<img [^\<\>]*\>", "ig");

    paragraphs.each(function(index, item){
        var itemHtml = $(item).html();
        var tags = itemHtml.match(htmlTagRegexp);

        var newHtml = "";

        var textArray = $(item).html().split(htmlTagRegexp);
        var itemIndex = 0;
        for (var i= 0; i< textArray.length; i++) {

            var currentTag = tags[i] === undefined ? "" : tags[i]

            var textItems = textArray[i].split(/\s+/g);
            for (var textItemIndex in textItems) {
                var currentTextItem = textItems[textItemIndex];
                if (
                    /^\w+$/.test(currentTextItem) ||
                    /^\w+\'\w+$/.test(currentTextItem) || /* xxx's */
                    /^\w+(\-*\w+)+$/.test(currentTextItem) || /* S-H-E */
                    /^\w(\.\w)+$/.test(currentTextItem) || /* S.H.I.E.L.D */
                    /^\w(\.\w\.)+$/.test(currentTextItem) /* U.S. */
                )
                {
                    newHtml += '<span class="word">'+currentTextItem+'</span>';
                } else {
                    var wordRegexp = /\w+/ig;
                    var words = currentTextItem.match(wordRegexp);
                    var symbols = currentTextItem.split(wordRegexp);

                    for (var symbolIndex in symbols) {
                        if (words == null) {words = [""];}
                        var currentWord = words[symbolIndex]  === undefined ? "" : words[symbolIndex];
                        var currentWordHtml = currentWord == "" ? "" : '<span class="word">'+currentWord+'</span>';
                        var otherSymbol = symbols[symbolIndex]
                        var otherSymbolHtml = otherSymbol == "" ? "" : '<span class="symbol">' + otherSymbol + '</span>';
                        newHtml += (
                        otherSymbolHtml + currentWordHtml);
                    }
                }
                newHtml += " ";
            }

            newHtml += currentTag;

            itemIndex += 1;
        }

        $(this).html(newHtml);
    });
}