/*
* A jQuery UI widget for getting VIAF identifiers via autosuggest
*  h/t to 	Matthew Hailwood http://jquery.webspirited.com/author/Hailwood/ for his
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

/*
 * First we start off with the closure
 * Notice that we pass in $ to the closure?
 * This is so that we can use $ as an alias to jQuery
 */
(function($) {

  /* First line defines the name of your widget */
  $.widget("ui.viafauto", $.ui.autocomplete, {
    /*
     * Next line contains an object containing all the default options
     * that you want to use in your plugin
     */ 
   options: {
 // select: function(event, ui) { alert("Selected!"); return this._super(event, ui); },
    source: function(request, response) {
        var term = $.trim(request.term); 
        var url  = "http://viaf.org/viaf/AutoSuggest?query=" + term;
        $.ajax({
            url: url,
            dataType: "jsonp",
            success: function(data) {
                var ct = 0; 
                if (data.result) {
                    response( $.map( data.result, function(item) {
                        // CUT THIS OUT WHEN WE GET THE NEW ENDPOINT
                        if      (ct % 4 === 0) {item.nametype="personal"; }
                        else if (ct % 4 === 1) {item.nametype="work"; }
                        else if (ct % 4 === 2) {item.nametype="organization";}
                        else {item.nametype="geographic";}
                        // END OF CUT OUT
                        var retLbl = item.term;
                        if (item.nametype) {
                            retLbl = retLbl + " [" + item.nametype + "]";
                        }
                        ct++;
                        return {
                            label: retLbl,
                            value: item.term,
                            id: item.viafid,
                            nametype: item.nametype
                        }
                    }));
                }
                if (ct === 0) {
                    self._trigger('_nomatch',$.Event("_nomatch"), {term: term} );
                }
            },
        });  // end of $.ajax()
    }},       // end of source:, options

/*      source: function(request, response) {
            var o = this.options;
    		var term = $.trim(request.term); 
			var url = "http://viaf.org/viaf/AutoSuggest?query=" + term;
			$.ajax({
				url: url,
				dataType: "jsonp",
				jsonp: "jsonp",
				crossDomain: true,
				data: {},
				success: function(data) {
					var ct = 0; 
					response( $.map( data.results, function(item) {
						var retLbl = item.term;
						ct++;
						return {
							label: retLbl,
							value: retLbl,
							id: item.viafid
						}
					}));
					if (o.oncount && $.isFunction(o.oncount)) {
						o.oncount(self.elements.$box.autocomplete("widget"), ct);
					}
				},
				statusCode: {
				    200: function() { self.calcAndSetWidth(o.menuWidth, o.menuHeight); },
				    404: function() {alert("404");}
			    }
			});
		} */

    /*
     * Then we have the _create function
     * This function gets called as soon as your widget is invoked
     * Think of it as the initialization function.
     */
    _create: function() {
        return this._super();
    },
    _setOption: function( key, value ) {
        this._super( key, value );
    },
    _setOptions: function( options ) {
        this._super( options );
    }
  });
})(jQuery);
