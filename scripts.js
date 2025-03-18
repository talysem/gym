function MyKO() {
    const self = this;

    // Funções universais
    self.fillNumeroParaId = function(numero) {
        return numero.toString().padStart(3, '0');
    }







    // Informações dos treinos
    self.treinos = ko.observableArray([
        { id: 1, data: '17/03/2025', sentimento: '1', tempo: 5, sets: []}
    ]);

    // Informações do usuário
    self.user = {
        name: ko.observable('você'),
        lastName: ko.observable(''),
        age: ko.observable('')
    }; // salvar

    // Informações das metas
    self.meta = ko.observable(0); // salvar
    self.metaTexto = ko.computed(() => self.fillNumeroParaId(self.meta()));

    self.treinosInseridos = ko.observable(0); // salvar

    self.metaAtingida = ko.computed(() => self.treinos().length);
    self.metaAtingidaReal = ko.computed(() => self.metaAtingida() + self.treinosInseridos());
    self.metaAtingidaRealTexto = ko.computed(() => self.fillNumeroParaId(self.metaAtingidaReal()));











    // Navegação
    self.actualPage = ko.observable(2);
    self.openThisPage = function (page) {
        self.actualPage(page);
    };













    // Edição do nome do usuário
    self.tempName = ko.observable('');
    self.saveName = function () {
        if (self.tempName().trim().length > 0) {
            if(self.tempName().toString().toLowerCase() == 'gil' || self.tempName().toString().toLowerCase() == 'gilvane') {
                self.tempName('Nojeira')
                self.user.name(self.tempName());
            } else {
                self.user.name(self.tempName().trim());
            }
        }

        self.tempName('');
        self.salvarDados()
    };

    // Edição da meta
    self.tempMeta = ko.observable('');
    self.saveMeta = function () {
        const value = parseInt(self.tempMeta(), 10);
        if (!isNaN(value)) {
            self.meta(value);
        }

        self.tempMeta('');
        self.salvarDados()
    };

    // Edição do número de treinos inseridos
    self.tempTreinosInseridos = ko.observable('');
    self.savetreinosInseridos = function () {
        const value = parseInt(self.tempTreinosInseridos(), 10);
        if (!isNaN(value)) {
            self.treinosInseridos(value);
        }

        self.tempTreinosInseridos('');
        self.salvarDados()
    };













    self.setsTreinos = ko.observable({
        triceps: ko.observableArray([
            {
                id: ko.observable(1),
                data: ko.observable('09/03/2025'), // Data do treino
                exercicios: ko.observableArray([
                    {
                        nome: ko.observable('Tríceps Testa'),
                        carga: ko.observable(20), // Exemplo: 20kg
                        reps: ko.observable(10), // Exemplo: 10 repetições
                        tempo: ko.observable(30) // Exemplo: 30 segundos
                    },
                    {
                        nome: ko.observable('Tríceps Pulley'),
                        carga: ko.observable(15),
                        reps: ko.observable(12),
                        tempo: ko.observable(40)
                    }
                ])
            },
            {
                id: ko.observable(2),
                data: ko.observable('10/03/2025'),
                exercicios: ko.observableArray([
                    {
                        nome: ko.observable('Tríceps Francês'),
                        carga: ko.observable(18),
                        reps: ko.observable(8),
                        tempo: ko.observable(35)
                    },
                    {
                        nome: ko.observable('Tríceps Mergulho'),
                        carga: ko.observable(0), // Peso corporal
                        reps: ko.observable(15),
                        tempo: ko.observable(45)
                    }
                ])
            }
        ])
    });
    






















    self.adicionarItem = function () {

    }

    self.modalAdicionarItem = ko.observable(false);
    self.abrirModalAdicionarItem = function () {
        self.modalAdicionarItem(!self.modalAdicionarItem())
    }

















    self.selectedColor = ko.observable(0)
    const colors = [
        'var(--mainColor_Rosa)',
        'var(--mainColor_Roxo)',
        'var(--mainColor_Vermelho)',
        'var(--mainColor_Verde)',
        'var(--mainColor_Azul)'
    ];
    self.selectThisColor = function (color) {
        self.selectedColor(color)
        self.salvarDados()
        document.documentElement.style.setProperty('--mainColor_HSL', colors[color]);
    }














    // Salvar dados em localStorage
    self.salvarDados = function () {
        const data = {
            user: ko.toJS(self.user),
            treinos: ko.toJS(self.treinos),
            meta: self.meta(),
            treinosInseridos: self.treinosInseridos(),
            selectedColor: self.selectedColor()
        };

        localStorage.setItem('appData', JSON.stringify(data));
    };

    self.pegarDados = function () {
        const savedData = localStorage.getItem('appData');

        if (savedData) {
            const parsedData = JSON.parse(savedData);

            self.user.name(parsedData.user.name || '');
            self.user.lastName(parsedData.user.lastName || '');
            self.user.age(parsedData.user.age || '');

            self.treinos(parsedData.treinos || []);
            self.meta(parsedData.meta || 0);
            self.treinosInseridos(parsedData.treinosInseridos || 0);

            // Restaurando a cor selecionada
            self.selectedColor(parsedData.selectedColor || 0);

            document.documentElement.style.setProperty('--mainColor_HSL', colors[self.selectedColor()]);
        }
    };

    window.onload = () => { self.pegarDados(); }
}

ko.applyBindings(new MyKO());