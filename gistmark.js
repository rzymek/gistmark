
if (Meteor.isClient) {
    Template.main.events({
       'keyup textarea' : function(e){
           Session.set('value',e.target.value);
       }
    });
    Template.main.helpers({
        get: function(key) {
            return Session.get(key);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
    });
}
