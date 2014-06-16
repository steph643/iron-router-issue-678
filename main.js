
MyCollection1 = new Meteor.Collection("myCollection1");
MyCollection2 = new Meteor.Collection("myCollection2");

if (Meteor.isClient)
    {

    Router.map(function ()
        {
        this.route('page1',
            {
//          action: function () { if (this.ready()) this.render(); },                   // UNCOMMENT FIRST FOR EXPECTED BEHAVIOR
//          onBeforeAction: function(pause) { if (!this.ready()) pause(); },            // UNCOMMENT SECOND FOR UNEXPECTED BEHAVIOR
            waitOn: function () { return Meteor.subscribe('myCollection1'); },
            data:   function () { return { myCollection1Cursor: MyCollection1.find({}) }; },
            });
        this.route('page2',
            {
//          action: function () { if (this.ready()) this.render(); },                   // UNCOMMENT FIRST FOR EXPECTED BEHAVIOR
//          onBeforeAction: function(pause) { if (!this.ready()) pause(); },            // UNCOMMENT SECOND FOR UNEXPECTED BEHAVIOR
            waitOn: function () { return Meteor.subscribe('myCollection2'); },
            data:   function () { return { myCollection2Cursor: MyCollection2.find({}) }; },
            });
        });
        
    // A template helper to display the content of a collection cursor
    // Displays an error message instead if cursor evaluates to false
    UI.registerHelper('logCollection', function(title, cursor) 
        {
        var log = cursor ? cursor.map(function(e) { return e.value; }) : 'WARNING, NULL OR UNDEFINED!!!';
        console.log(title + log); 
        });
    }

if (Meteor.isServer)
    {
    MyCollection1.remove({});
    MyCollection1.insert({ value: 1 });
    MyCollection1.insert({ value: 2 });
    MyCollection1.insert({ value: 3 });
    Meteor.publish('myCollection1', function() { return MyCollection1.find({}); });
    
    MyCollection2.remove({});
    MyCollection2.insert({ value: 4 });
    MyCollection2.insert({ value: 5 });
    MyCollection2.insert({ value: 6 });
    Meteor.publish('myCollection2', function() { return MyCollection2.find({}); }); 
    }
