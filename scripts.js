function MyKO() {
    self = this;

    self.user = {
        name: ko.observable('' || 'você'),
        lastName: ko.observable(''),
        age: ko.observable('' || '000'),
        goal: ko.observable('' || '000'),
        currentGoal: ko.observable('000')
    }

    // fim das informações do usuario
}

ko.applyBindings(new MyKO());