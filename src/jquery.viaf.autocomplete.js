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
  $.widget("ui.viafcomplete", {
    /*
     * Next line contains an object containing all the default options
     * that you want to use in your plugin
     */ 
    options: {
    	baseUrl: "http://viaf.org/viaf/AutoSuggest?query=",
    	boxWidth: "20",
    	startsWith: false,
    	authType: null,
    	onNoMatch: {
    		clearId: true,
			clearBox: true
    	},
    	onNoSelect:{ 
    		clearId: true,
			clearBox: true
    	},
	    _nomatch: function(event, ui) {
			var $elem = $(this).data("viafcomplete");
			var o = $elem.options;
			var elements = $elem.elements;
			elements.$box.removeClass("ui-autocomplete-loading");
   			if (o.onNoMatch.clearBox) {
				elements.$box.val(""); 
			}
			if (o.onNoMatch.clearId) {
				$(this).val("");
			};	
			if ($.isFunction(o.nomatch)) {
				return o.nomatch(o,elements);
			}
			return true;
    	},
    _noselect: function(event) {
    		var $elem = $(this).data("viafcomplete");
			var o = $elem.options, elements = $elem.elements;
			elements.$box.removeClass("ui-autocomplete-loading");
 			if (o.onNoSelect.clearBox) {
				elements.$box.val(""); 
			}
			if (o.onNoSelect.clearId) {
				$(this).val("");
			};	
			if ($.isFunction(o.noselect)) {
				return o.noselect(o,elements);
			}
				return true;
    	},
    	_setOption: function(key, value) {
    		$.Widget.prototype._setOption.apply(this, arguments);
    		
    		switch(key) {
	    		case "startsWith":
	    			break;
	    		case "boxWidth":
	    			this.elements.$box.attr("size", value);
	    			break;
	    		case "label":
	    			this.elements.$label.text(value);
	    			break;
	    		default:
	    			var url = this._getUrl();
	    			this.elements.$box.data("url", url);
	    			break;
    		}    		
    	},
    },

    /*
     * Then we have the _create function
     * This function gets called as soon as your widget is invoked
     * Think of it as the initialization function.
     */
    _create: function() {
    	var  self = this,o = this.options, e = this.element;
    	var doc = e[ 0 ].ownerDocument;

    	this.selectFxn = (function(event, ui) {
    		self.elements.$box.removeClass("ui-autocomplete-loading");
    		//console.log("label: " + ui.item.label + " pref: " + ui.item.pref);
				var hid = $(this).attr("hidId");
				if (hid) {
					var preval = $(hid).val();
					$(hid).val(ui.item.id);
				}
				if (o.usepref) {
					self.boxValue(ui.item.pref);
				}
				else {
					self.boxValue(ui.item.label);
				}
			if (o.select) {o.select( ui.item, event);}
			return false;
		});
    	this.sourceFxn = (function(request, response) {
    		var auth = this.options.auth;
    		var term = $.trim(request.term); 
			var url = this.element.data("url") + term;
			$.ajax({
				url: url,
				dataType: "jsonp",
				data: {},
				success: function(data) {
					var ct = 0; 
					response( $.map( data.result, function(item) {
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
					if (ct === 0) {
						if (!(o.uri_prfx && term == o.uri_prfx.substr(0,term.length))) {
							self._trigger('_nomatch',$.Event("_nomatch"), {term: term} );
						}
					}
					else {
						console.log("not implemented");
					}
				},
				statusCode: {
				    200: function() {
						console.log("200");
				    }, 
				    404: function() {
				    	alert("404");
				    }
				  }
			});
		});
    	var hidden = $(e).is(':hidden'),selfId = $(e).attr('id'),prefx="oclcviaf_" + selfId;
    	var labelId = prefx + "_lbl", textId = prefx+ "_box", divId = prefx + "_div";
    	var lbl = '<label for="' + textId + '" id="' + labelId + '">' + ((o.label)?o.label:'') + '</label> ';
     	var boxHtml	= lbl + '<input type="text" id="' + textId + '" size="' + o.boxWidth + '"/>';
    	$(e).after('<div id="' + divId +'" class="ui-widget">' + boxHtml + '</div>');
    	this.elements = {$label: e.parent().find('#' + labelId), $box: e.parent().find('#' + textId), $div: e.parent().find('#' + divId)};
     	/* these are the options needed for autocomplete.  We use the created $div as the "appendTo" object*/
    	this.acOptions = {
    			minLength: 2,
    			//delay:300,
    			startsWith: o.startsWith,
    			appendTo: o.appendTo || this.elements.$div,
    			hidId: o.box,
    			auth: o.auth,
    			autoFocus: o.autoFocus,
    			select: this.selectFxn,
				change: function(event,ui) {
    				var that = this;
						$(that).removeClass("ui-autocomplete-loading");
      				var foundItem = (ui.item)?true:false;
  					if (!foundItem){
 						self._trigger('_noselect');
 					}
	    		},
    			source: this.sourceFxn
    	};
     	this.elements.$box.attr('hidId', '#'+selfId)
    				.data("url",this._getUrl())
    				.autocomplete(this.acOptions);
//    				.addClass("ocl_textbox");

   },
  	
//    },

    /*
     * Next we can declare any private functions to be used internally by the widget
     * Although I'm not sure if jQuery does anything to protect these functions when
     * you prefix the name with an "_" it's not a bad design idea as you can instantly
     * recognize that the function is an internal function not to be called publicly
     */
    _init: function() {
 	   var  e = this.element,selfId = $(e).attr('id');
 	   this._initValue($(e).val(), this.elements.$box);
    },
    _initValue: function(termId,$box) {
 	   if (!termId) { return; }
 	   // here's where we might pull stuff from VIAF
 	   return;
    },
     _destroy : function() {
    },
	_getUrl : function() {
		var o = this.options, url = o.baseUrl;
		if (o.type) {
			url = url + "&type=" + type;
		}
		return url;
	},
    /*
     *   Public functions
     */
	
    getDiv: function() {
 	   return this.elements.$div;
    },
    getBox: function() {
 	   return this.elements.$box;
    },
    boxValue : function(val) {
 	  var $box = this.elements.$box;
 	  if (val != null) {
 		  $box.val(val);
 	  }
 	  return $box.val();
    },
    

    /*
     * It is a good idea to write your own destroy function. The idea behind this is to remove any dom
     * changes you have made, or any variables you have left lying around.
     * jQuery will deal with removing the instance of the plugin.
     */
    destroy: function() {}
  });
  /*
   * Remember what I said in the first comment?
   * we pass in jQuery here so it gets aliased as $
   */
})(jQuery);
