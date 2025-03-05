function UserData() {
    self = this;

    self.user = {
        name: ko.observable('teste'),
        lastName: ko.observable(''),
        age: ko.observable('')
    }



}

ko.applyBindings(new UserData());