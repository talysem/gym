function MyKO() {
    self = this;

    self.user = {
        name: ko.observable('' || 'você'),
        lastName: ko.observable(''),
        age: ko.observable(''),
        goal: ko.observable(0),
        currentGoal: ko.observable(0)
    }

    self.user.goalText = ko.computed(() => self.user.goal().toString().padStart(3, '0'));
    self.user.currentGoalText = ko.computed(() => self.user.currentGoal().toString().padStart(3, '0'));

    // fim das informações do usuario

    self.actualPage = ko.observable(0)

    self.openThisPage = function (page) {
        self.actualPage(page)
    }






    self.teste = function () {
        self.user.currentGoal(self.user.currentGoal() + 1)
    }

    self.tempName = ko.observable('')
    self.saveName = function () {
        if (self.tempName().length > 0) {
            if (self.tempName() == 'gil' || self.tempName() == 'Gil' || self.tempName() == 'Gilvane' || self.tempName() == 'gilvane') {
                self.tempName('Nojento')
            }
            self.user.name(self.tempName())
        }
        self.tempName('')
    }
}

ko.applyBindings(new MyKO());