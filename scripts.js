function MyKO() {
    const self = this;

    // Informações dos treinos
    self.treinos = ko.observableArray([]);

    // Informações do usuário
    self.user = {
        name: ko.observable('você'),
        lastName: ko.observable(''),
        age: ko.observable(''),
        goal: ko.observable(0),
    };

    // Informações das metas
    self.meta = ko.observable(0);
    self.metaTexto = ko.computed(() => self.meta().toString().padStart(3, '0'));

    self.treinosInseridos = ko.observable(0);

    self.metaAtingida = ko.computed(() => self.treinos().length);
    self.metaAtingidaReal = ko.computed(() => self.metaAtingida() + self.treinosInseridos());
    self.metaAtingidaRealTexto = ko.computed(() => self.metaAtingidaReal().toString().padStart(3, '0'));

    // Navegação
    self.actualPage = ko.observable(0);
    self.openThisPage = function (page) {
        self.actualPage(page);
    };

    // Teste - adiciona um treino na lista
    self.teste = function () {
        self.treinos.push({}); // Adiciona um treino fictício
    };

    // Edição do nome do usuário
    self.tempName = ko.observable('');
    self.saveName = function () {
        if (self.tempName().trim().length > 0) {
            self.user.name(self.tempName().trim());
        }
        self.tempName('');
    };

    // Edição da meta
    self.tempMeta = ko.observable('');
    self.saveMeta = function () {
        const value = parseInt(self.tempMeta(), 10);
        if (!isNaN(value)) {
            self.meta(value);
        }
        self.tempMeta('');
    };

    // Edição do número de treinos inseridos
    self.tempTreinosInseridos = ko.observable('');
    self.savetreinosInseridos = function () {
        const value = parseInt(self.tempTreinosInseridos(), 10);
        if (!isNaN(value)) {
            self.treinosInseridos(value);
        }
        self.tempTreinosInseridos('');
    };
}

ko.applyBindings(new MyKO());
