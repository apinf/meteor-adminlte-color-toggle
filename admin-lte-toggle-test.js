if (Meteor.isClient) {

  Template.body.created = function () {
    // Get reference to template instance
    var instance = Template.instance();

    // Create reactive variable with default value
    instance.skinColorClass = new ReactiveVar('skin-blue');
  };

  Template.body.onRendered(function () {
    // Get reference to template instance
    var instance = this;

    // Get reference to body
    var body = $("body");

    // When the selected template changes, change the body classes to match
    instance.autorun(function () {
      // Get value of reactive variable
      var skinColorClass = instance.skinColorClass.get();

      // Clear body class(es)
      body.removeClass();
      // TODO: see if only the skin-color-class can be removed
      // So that the sidebar-mini remains, while allowing color changes
      // I.e. if sidebar-collapse is present, it should not be removed

      // Set body classes with skin color class and sidebar class
      body.addClass(skinColorClass);

      // Add the sidebar-mini class, to re-enable collapsing
      body.addClass("sidebar-mini");
    });
});

  Template.body.helpers({
    color: function () {
      // Get reference to template instance
      var instance = Template.instance();

      // Get value of skin color class reactive variable
      return instance.skinColorClass.get();
    }
  });

  Template.body.events({
    'change #color-select': function (event, template) {
      var instance = Template.instance();

      // increment the counter when button is clicked
      var color = event.target.value;

      // Set the skin color class to the chosen color
      instance.skinColorClass.set(color);
    }
  });
}
