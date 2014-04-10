(function($) {
    $.fn.emots = function(options) {
        var defaults = {
            extra: null
        };

        var options = $.extend(defaults, options);
        var containers = this, regex = [], css = {};

        var emots = [
            ':)', ':-)', ';)', ';-)', ':]', ':-]', ';]', ';-]',
            ':(', ':-(', ';(', ';-(', ':[', ':-[', ';[', ';-[',
            ':D', ';D', ':P', ';P', ':p', ';p',
            ':|', ':-|', ':/', ':-/',
            ':O', '&lt;3', ':*', ';*'
        ], css = {
            '&lt;3': 'emot-inverse'
        };

        if (typeof options.extra === 'object') {
            for (var extraCss in options.extra) {
                var extraEmot = options.extra[extraCss];
                if (Array.isArray(extraEmot)) {
                    $(extraEmot).each(function() {
                        emots.push(this);
                        if (extraCss % 1 !== 0) {
                            css[this] = extraCss;
                        }
                    });
                } else {
                    emots.push(extraEmot);
                    if (extraCss % 1 !== 0) {
                        css[extraEmot] = extraCss;
                    }
                }
            }
        }

        var escape = new RegExp('(\\' + (['(', ')', '[', ']', '{', '}', '<', '>', '*', '|', '^', '=', '\\', '%']).join('|\\') + ')', 'g');

        $(emots).each(function() {
            regex[this] = this.replace(escape, '\\$1');
            regex[this] = new RegExp('(^|[^https?|\"\>][\\s\\0]*)' + '(' + regex[this] + ')', 'g');
        });

        $(containers).each(function() {
            for (var emot in regex) {
                $(this).html($(this).html().replace(regex[emot], "$1<span class='emot " + (css[emot] ? css[emot] : 'emot-rotate') + "'>$2</span>"));
            }
        });
    };
})(jQuery);