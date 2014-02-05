/*
* A jQuery UI widget for getting VIAF identifiers via autosuggest
*  h/t to 	Matthew Hailwood http://jquery.webspirited.com/author/Hailwood/ for his
* most excellent jquery UI widget framework at 
* http://jquery.webspirited.com/2011/03/jquery-ui-widget-development-skeleton/#more-109
*/


/*
 * First we start off with the closure
 * Notice that we pass in $ to the closure?
 * This is so that we can use $ as an alias to jQuery
 */
(function($) {

  /* First line defines the name of your widget */
  $.widget("ui.widgetName", {
    /*
     * Next line contains an object containing all the default options
     * that you want to use in your plugin
     */
    options: {},

    /*
     * Then we have the _create function
     * This function gets called as soon as your widget is invoked
     * Think of it as the initialization function.
     */
    _create: function() {

      /*
       * Its a good idea to store a reference to the object
       * That way you can reference "self" inside anything that changes
       * The scope of "this"
       *
       * "this" references the plugin instance
       * "this.element" references the dom element the widget was called on
       */
      var self = this;
    },

    /*
     * Next we can declare any private functions to be used internally by the widget
     * Although I'm not sure if jQuery does anything to protect these functions when
     * you prefix the name with an "_" it's not a bad design idea as you can instantly
     * recognize that the function is an internal function not to be called publicly
     */
    _myPrivateFunction: function() {
      /*
       * You can reference "this" in the same scope as "_create"
       * This function is designed to be called using "this._myPrivateFunction()"
       */
    },

    /*
     * Next we can declare any public functions to be called externally to modify or
     * interact with the widget. This is one of the most powerful features of the
     * jQuery UI Widget Factory
     */
    myPublicFunction: function() {
      /*
       * You can reference "this" in the same scope as "_create"
       * This function is designed to be called using "$('#elementId').widgetName('myPublicFunction')"
       */
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
