/*
* A jQuery UI widget for getting VIAF identifiers via autosuggest
*  h/t to     Matthew Hailwood http://jquery.webspirited.com/author/Hailwood/ for his
* most excellent jquery UI widget framework at 
* http://jquery.webspirited.com/2011/03/jquery-ui-widget-development-skeleton/#more-109
*/
/*
 * Depends on jQuery UI version 1.8.1 or higher
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *  jquery.ui.position.js
 *  jquery.ui.button.js
 *  jquery.ui.dialog.js
 *  jquery.ui.autocomplete.js
 *  
 *  Assumes jQuery UI css, images, etc.
 *  
 *  Make sure you load the right version of jQuery for your version of jQuery UI!!
 */

(function($) {
  $.widget("oclc.viafautox", {
    options: {
        baseUrl: "http://viaf.org/viaf/AutoSuggest?query=",
        noselect: null,
        nomatch: null,
         _setOption: function(key, value) {
            $.Widget.prototype._setOption.apply(this, arguments);
        },
    },

    /*
     * This function gets called as soon as this widget is invoked
     */
    _create: function() {
        var self = this, o = this.options, e = this.element;
        // we support any input change event, but need to deal with noselect
        this.changeFxn = (function(event, ui) {
        	if (o.change) {
        		o.change(event, ui);
        	}
        	var foundItem = (ui.item)?true:false;
        	if (!foundItem){
        		self._trigger('noselect');
        	}
        	return false;
        });
        this.sourceFxn = (function(request, response) {
             var term = $.trim(request.term);
            var url = self.options.baseUrl + term;
            var noselect = self.options.noselect;
            $.ajax({
                url: url,
                dataType: "jsonp",
                data: {},
                success: function(data) {
                     if (data.result) {
                        response( $.map( data.result, function(item) {
                            var retLbl = item.term;
                            if (item.nametype) {
                                retLbl = retLbl + " [" + item.nametype + "]";
                            }
                            return {
                                label: retLbl,
                                value: item.term,
                                id: item.viafid,
                                nametype: item.nametype
                            }
                        }));
                    }
                    else {
                    	$(self.element).removeClass("ui-autocomplete-loading");
                    	self._trigger('nomatch', null, {term:$(self.element).val()});
                    }
                },
                statusCode: { // we're leaving this here for debugging purposes
                    200: function() {
                        //console.log("200");
                    },
                    404: function() {
                        //alert("404");
                    }
                }
            });
        });
        /* these are the options needed for autocomplete.  */
        var acOpts = $.extend(true, {}, o);
        acOpts.source= this.sourceFxn;
       acOpts.change = this.changeFxn;
        $(self.element).autocomplete(acOpts);
       
    },

    /*
     * PRIVATE FUNCTIONS
     */
    _init: function() {
 
    },

    _destroy : function() {
    },
 
    destroy: function() {}
  });
  /*
   * we pass in jQuery here so it gets aliased as $
   */
})(jQuery);
