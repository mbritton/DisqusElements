
;(function ($, window, document, undefined) {

    var pluginName = "disqusElements", defaults = {};

    function DisqusElements(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    DisqusElements.prototype = {
        /**
         *
         * I inject the embed script into the DOM,
         * create the threads and load the default
         * discussion.
         */
        init: function () {
            console.log('INIT');
            var scopeTarget = this;
            var dsq = document.createElement('script');
            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = '//' + this.options.shortname + '.disqus.com/embed.js';

            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

            this.createThreadButtons();
            this.switchDisqus();

            $('.landingPage').css('display',(this.options.showOnLanding)?'inline':'none');
        },
        /**
         *
         * I move Disqus wrapper out of an expanded
         * bubble and onto the landing page, and reset
         * all expended bubbles back to minimized.
         */
        clearValues: function () {
            if (!$('.landingPage').hasClass('disqusWrapper'))
                $('.disqusWrapper').appendTo('.landingPage');

            $('.sectionCommentButton').removeClass('sectionCommentButtonExpand');
            $('.numComments').show();
            $('.closeButton').hide();
        },
        /**
         *
         * I add a comment button to each paragraph tag,
         * and establish event handlers for them.
         */
        createThreadButtons: function () {
            var ctr = 0, scopeTarget = this;
            var tmp = $(this.element).find('p');
            $(this.element).find('p').each(function () {
                var closeButton = '<div id="closeButton_'+$(this).attr('id')+'" class="closeButton">Close</div>';
                var commentButton = '<div id="' + $(this).attr('id') + '" class="sectionCommentButton">' + closeButton + '<br clear="all"/></div>';
                $(this).prepend(commentButton);
                scopeTarget.doCommentCount($(this).attr('id'));
                ctr++;
            });
            /**
             * When the button is clicked, I create event listeners
             * for the close button, expand the clicked target if
             * necessary, set the new identifier, show close button,
             * and switch (reset) the Disqus.
             */
            $('.sectionCommentButton').on('click', function (e) {
                var selectedID, isCloseBut = (e.target.id.indexOf('closeButton_') >= 0)?true:false;

                $('.closeButton').on('click', function () {
                    if (!$(scopeTarget).hasClass('sectionCommentButtonExpand'))
                        scopeTarget.switchDisqus();
                });

                /**
                 *
                 * If it's not expanded and the clicked item isn't the close button,
                 * expand the button, set the global identifier and reinitialize the
                 * Disqus embed to the new application state.
                 */
                if (!$(this).hasClass('sectionCommentButtonExpand') && !isCloseBut) {
                    $(this).addClass('sectionCommentButtonExpand');

                    if ($(e.target).attr('id').indexOf('numComments_')>=0) {
                        var spl = $(e.target).attr('id').split('_');
                        selectedID = spl[1];
                        $('#numComments_'+selectedID).hide();
                    } else {
                        selectedID = e.target.id;
                    }

                    scopeTarget.options.identifier = selectedID;
                    scopeTarget.switchDisqus(selectedID);
                    $('.closeButton').show();
                }

                $(this).on('scroll', function(e) {
                    //$('.closeButton_'+selectedID).css('')
                });

            });
        },
        /**
         *
         * @param elemID
         * Fetch number of comments from the API and put the
         * number on top of its corresponding bubble.
         *
         */
        doCommentCount: function (elemID) {
            var scopeTarget = this;
            var urlArray = [];
            urlArray.push("link:" + this.options.baseurl+'/#!' + elemID);

            $.ajax({
                type: 'GET',
                url: this.options.setURL,
                data: { api_key: this.options.publicKey, forum: this.options.shortname, thread: urlArray },
                cache: false,
                dataType: 'jsonp',
                success: function (result) {
                    if (result.response && result.response != '') {
                        for (var i in result.response) {
                            var countText = " comments";
                            var count = result.response[i].posts;
                            var nc = '<div id="numComments_'+elemID+'" class="numComments">'+result.response[i].posts+'</div>';
                            $('#'+elemID+' .sectionCommentButton').prepend(nc);
                        }
                    } else {
                        var nc = '<div id="numComments_'+elemID+'" class="numComments">0</div>';
                        $('#'+elemID+' .sectionCommentButton').prepend(nc);
                    }
                }
            });
        },
        /**
         *
         * @param identifier
         * I reset Disqus with a new identifier.
         */
        switchDisqus: function (identifier) {
            var scopeTarget = this, noIdentifier = false;
            // We need a pause when it first loads
            if (!identifier || identifier == undefined) {
                noIdentifier = true;
                identifier = this.options.identifier;
                scopeTarget.clearValues();
            }

            setTimeout(function (event) {
                try {
                    DISQUS.reset({
                        reload: true,
                        config: function () {
                            this.page.identifier = identifier;
                            this.page.url = scopeTarget.options.baseurl + '/#!' + identifier;
                            this.page.title = identifier;
                            this.page.language = scopeTarget.options.language;

                            $('.disqusWrapper').appendTo('.sectionCommentButtonExpand');
                        }
                    });
                } catch (error) {
                    /**
                     * Handle errors here.  You will likely see ReferenceError, as Disqus is
                     * in an iframe.
                     */
                }
            }, noIdentifier?500:0); // We need a pause when it first loads
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new DisqusElements(this, options));
            }
        });
    };

})(jQuery, window, document);