
if (Meteor.isClient) {
    Deps.autorun(function() {
        var value = Session.get('value');
        if (Meteor.userId() && value)
            Meteor.call('update', value);
    });
    Deps.autorun(function() {
        if (Meteor.userId()) {
            Meteor.call('get', function(err, result) {
                if (err) {
                    alert(JSON.stringify(err));
                } else {
                    Session.set('value', result);
                }
            })
        }
    });
    Template.main.events({
        'keyup textarea': function(e) {
            Session.set('value', e.target.value);
        }
    });
    Template.main.helpers({
        get: function(key) {
            return Session.get(key);
        },
        loggedIn: function() {
            return Meteor.userId() !== null;
        }
    });
}

if (Meteor.isServer) {
    Text = new Meteor.Collection('text');
    Meteor.methods({
        update: function(value) {
            if (!this.userId || !value)
                return;
            Text.upsert(this.userId, {value: value});
        },
        get: function() {
            if (!this.userId)
                return '';
            var doc = Text.findOne(this.userId);
            return doc ? doc.value : '';
        }
    });
}
