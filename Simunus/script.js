/* ============================================================
   SIMULADO DE ESTUDOS — ARQUITETURA FINAL
   Fluxo: acesso → boas-vindas → matéria → fase → questões
   ============================================================ */

const estado = {
    idioma: window.SimunusI18n.current(),
    materiaId: null,
    faseNumero: null,
    bancoAtual: [],
    perguntas: [],
    perguntaAtual: 0,
    pontos: 0,
    acertos: 0,
    erros: 0,
    carregamentoId: 0,
    dadosSemiologia: null,
    customPhaseId: null, // ID da matéria personalizada; nome legado preservado para compatibilidade
    customSubjectId: null,
    mediaBase: "",
    simuladosDisponiveis: [],
    catalogoSupabaseCarregado: false,
    catalogoSupabaseErro: null,
    catalogoSupabaseErroCodigo: null,
    simuladoSupabase: null,
    resultadoSupabase: null,
    catalogoAcademico: null,
    catalogoAcademicoErro: null,
    materiaAcademicaAreaId: null,
    dashboardEstudo: null,
    faseAcademica: {
        iniciando: false,
        chave: null,
        attemptIdCriado: null
    },
    criarSimulado: {
        catalogo: null,
        carregando: false,
        erro: null,
        areaId: null,
        especialidadeId: null,
        topicIds: [],
        quantidade: null,
        modo: "immediate_feedback",
        iniciando: false,
        attemptIdCriado: null
    }
};

const historicoTelas = [];

const textos = {
    pt: {
        tituloDocumento: "Simulados de Medicina",
        idiomaTitulo: "Simulados de Medicina",
        idiomaSubtitulo: "Semiologia e Farmacologia",
        idiomaPergunta: "Escolha o idioma",
        boasTitulo: "Bem-vindo à SIMUNUS",
        boasSubtitulo: "A sua plataforma de estudo",
        boasBotao: "COMEÇAR A ESTUDAR",
        materiasTitulo: "Selecione a Matéria",
        materiasSubtitulo: "Escolha a matéria que deseja estudar.",
        fasesTitulo: "Selecione a Fase",
        fasesSubtitulo: "Escolha a fase que deseja estudar.",
        voltarInicio: "Voltar ao início",
        voltarMaterias: "Voltar às matérias",
        escolherFase: "Escolher outra fase",
        carregando: "Carregando banco de questões...",
        carregandoPerguntas: "Carregando perguntas...",
        erro404: "Arquivo do banco não encontrado.",
        erroRede: "Não foi possível acessar o arquivo do banco. Verifique o caminho e o ambiente de execução.",
        erroJson: "O arquivo do banco não contém um JSON válido.",
        erroEstrutura: "O arquivo do banco não possui a estrutura esperada (questions).",
        erroVazio: "O banco de questões está vazio.",
        erroInesperado: "Ocorreu um erro inesperado ao carregar o banco.",
        erroRuntime: "Não foi possível carregar os dados desta fase localmente.",
        correto: "✅ Correto!",
        incorreto: "❌ Incorreto.",
        resposta: "A resposta é",
        respostaCorreta: "A resposta correta é",
        descricao: "Descrição:",
        alvo: "Alvo:",
        tipo: "Questão",
        proxima: "Próxima questão →",
        final: "🏆 Simulado finalizado!",
        suaPontuacao: "Sua pontuação",
        acertos: "Acertos",
        erros: "Erros",
        aproveitamento: "Aproveitamento",
        novamente: "Refazer",
        excelente: "Excelente desempenho! Você demonstrou ótimo domínio do conteúdo.",
        muitoBom: "Muito bom! Você teve um bom desempenho, mas ainda pode revisar alguns pontos.",
        bomComeco: "Bom começo. Vale a pena revisar os pontos que você errou.",
        continueEstudando: "Continue estudando. Refazer o simulado pode ajudar a fixar o conteúdo.",
        configuracoes: "Configurações",
        configuracoesSubtitulo: "Personalize sua experiência no aplicativo.",
        aparencia: "Aparência",
        aparenciaDescricao: "Escolha o modo de visualização.",
        tamanhoFonte: "Tamanho da Fonte",
        tamanhoFonteDescricao: "Ajuste a leitura para seu conforto.",
        idiomaConfig: "Idioma",
        idiomaConfigDescricao: "Idioma atualmente selecionado.",
        segurancaConta: "Segurança da Conta",
        segurancaContaDescricao: "Gerencie a segurança e as credenciais de acesso.",
        redefinirSenha: "Redefinir Senha",
        redefinirSenhaDescricao: "Altere sua senha de acesso.",
        fontePequena: "Pequena", fonteNormal: "Normal", fonteGrande: "Grande", fonteMuitoGrande: "Muito grande",
        modoClaro: "Modo claro", modoEscuro: "Modo escuro", voltar: "Voltar",
        sair: "Sair",
        acessoSubtitulo: "Acesso à sua plataforma de estudos",
        rotuloEmailAcesso: "E-mail",
        placeholderEmailAcesso: "seu@email.com",
        entrar: "Entrar",
        rotuloQuestao: "Questão",
        rotuloPontos: "Pontos",
        rotuloGrupo: "Grupo",
        alternativas: "Alternativas",
        carregandoPergunta: "Carregando pergunta...",
        suaPontuacao: "Sua pontuação",
        desempenho: "Desempenho",
        suasMaterias: "Minhas Fases", criarMateria: "Criar Nova Fase", minhasMaterias: "Praticar", favoritas: "Favoritas", gerenciarMaterias: "Gerenciar Fases",
        suasFasesTitulo: "Minhas Fases", suasFasesSubtitulo: "Crie, organize e estude suas fases personalizadas.", voltarSuasFases: "← Voltar", abrirListaSubtitulo: "Resolva, edite e organize as fases que você criou.", favoritosSubtitulo: "Acesse rapidamente suas fases favoritas.", gerenciarSubtitulo: "Edite, duplique ou exclua suas fases.", criarSubtitulo: "Monte uma nova fase com suas próprias questões.",
        personalizadas: "PERSONALIZADA", semMaterias: "Você ainda não criou nenhuma fase.", criarPrimeiraMateria: "Criar minha primeira fase",
        novaMateriaTitulo: "Criar Nova Fase", editarMateriaTitulo: "Editar Fase", nomeMateria: "Nome da Matéria", descricaoMateria: "Descrição",
        temaMateria: "Tema / Categoria", grupoMateria: "Grupo", grupoQuestao: "Grupo", dificuldade: "Dificuldade",
        facil: "Fácil", normal: "Normal", dificil: "Difícil", adicionarQuestao: "Adicionar Questão", editar: "Editar", duplicar: "Duplicar", excluir: "Excluir",
        jogar: "Abrir", favorito: "Favorito", salvar: "Salvar Fase", cancelar: "Cancelar", fechar: "Fechar",
        questaoTitulo: "Questão", enunciadoPT: "Enunciado", enunciadoES: "Enunciado (Español)", respostaPT: "Resposta Correta",
        respostaES: "Respuesta correcta (Español)", explicacaoPT: "Explicação", explicacaoES: "Explicación (Español)", alvoPT: "Objetivo", alvoES: "Objetivo (Español)",
        alternativasErradas: "Alternativas Incorretas", alternativasErradasES: "Alternativas incorrectas (Español)", alternativasErradasAjuda: "Preencha cada opção em seu próprio campo. A quarta opção é opcional.",
        confirmarExcluirMateria: "Excluir esta fase? As questões dela também serão removidas. Esta ação não poderá ser desfeita.",
        semQuestoes: "Adicione pelo menos uma questão.", camposObrigatorios: "Preencha os campos obrigatórios.",
         dashboard: { title: "Seu estudo, em continuidade", subtitle: "Acompanhe seu progresso e retome de onde parou.", next: "PRÓXIMO PASSO", performance: "Seu Desempenho", summary: "Resumo Geral", answered: "Questões Respondidas", correct: "Acertos", accuracy: "Aproveitamento", subjects: "Matérias Estudadas", review: "Modo Revisão", reviewDescription: "Revise Questões Importantes.", marked: "marcadas", saved: "salvas", evolution: "Evolução", sessions: "Últimas Sessões", shareEvolution: "Compartilhar Evolução", explore: "Explorar Matérias", reviewMarked: "Revisar Salvas", reviewMode: "Modo Revisão", resume: "Continuar", choose: "Escolher Matéria", yourPhases: "Minhas Fases", startTitle: "Comece seu primeiro estudo", startDescription: "Escolha uma matéria para começar a construir seu histórico.", continueQuestion: "Questão", continueStudying: "Continue estudando para acompanhar sua evolução.", recentSessions: "sessões recentes · aproveitamento por sessão", noSaved: "Você ainda não salvou nenhuma questão.", savedForReview: "questão salva para revisar", savedForReviewPlural: "questões salvas para revisar", wrongQuestions: "Questões Erradas", savedQuestions: "Questões Salvas", recentQuestions: "Últimas Feitas" },

    },
    es: {
        tituloDocumento: "Simulados de Medicina",
        idiomaTitulo: "Simulados de Medicina",
        idiomaSubtitulo: "Semiología y Farmacología",
        idiomaPergunta: "Elige el idioma",
        boasTitulo: "Bienvenido a SIMUNUS",
        boasSubtitulo: "Tu plataforma de estudio",
        boasBotao: "COMENZAR A ESTUDIAR",
        materiasTitulo: "Selecciona la Materia",
        materiasSubtitulo: "Elige la materia que deseas estudiar.",
        fasesTitulo: "Selecciona la Fase",
        fasesSubtitulo: "Elige la fase que deseas estudiar.",
        voltarInicio: "Volver al inicio",
        voltarMaterias: "Volver a las materias",
        escolherFase: "Elegir otra fase",
        carregando: "Cargando banco de preguntas...",
        carregandoPerguntas: "Cargando preguntas...",
        erro404: "No se encontró el archivo del banco.",
        erroRede: "No se pudo acceder al archivo del banco. Verifica la ruta y el entorno de ejecución.",
        erroJson: "El archivo del banco no contiene un JSON válido.",
        erroEstrutura: "El archivo del banco no tiene la estructura esperada (questions).",
        erroVazio: "El banco de preguntas está vacío.",
        erroInesperado: "Ocurrió un error inesperado al cargar el banco.",
        erroRuntime: "No fue posible cargar localmente los datos de esta fase.",
        correto: "✅ ¡Correcto!",
        incorreto: "❌ Incorrecto.",
        resposta: "La respuesta es",
        respostaCorreta: "La respuesta correcta es",
        descricao: "Descripción:",
        alvo: "Objetivo:",
        tipo: "Pregunta",
        proxima: "Siguiente Pregunta →",
        final: "🏆 ¡Simulado Finalizado!",
        suaPontuacao: "Tu Puntuación",
        acertos: "Aciertos",
        erros: "Errores",
        aproveitamento: "Rendimiento",
        novamente: "Reintentar",
        excelente: "¡Excelente desempeño! Demostraste un excelente dominio del contenido.",
        muitoBom: "¡Muy bien! Tuviste un buen desempeño, pero todavía puedes repasar algunos puntos.",
        bomComeco: "Buen comienzo. Vale la pena repasar los puntos que fallaste.",
        continueEstudando: "Continúa estudiando. Repetir el simulado puede ayudarte a fijar el contenido.",
        configuracoes: "Configuraciones",
        configuracoesSubtitulo: "Personaliza tu experiencia en la aplicación.",
        aparencia: "Apariencia",
        aparenciaDescricao: "Elige el modo de visualización.",
        tamanhoFonte: "Tamaño de Fuente",
        tamanhoFonteDescricao: "Ajusta la lectura a tu comodidad.",
        idiomaConfig: "Idioma",
        idiomaConfigDescricao: "Idioma actualmente seleccionado.",
        segurancaConta: "Seguridad de la Cuenta",
        segurancaContaDescricao: "Gestiona la seguridad de tu cuenta y tus credenciales de acceso.",
        redefinirSenha: "Restablecer Contraseña",
        redefinirSenhaDescricao: "Cambia tu contraseña de acceso.",
        fontePequena: "Pequeña", fonteNormal: "Normal", fonteGrande: "Grande", fonteMuitoGrande: "Muy Grande",
        modoClaro: "Modo Claro", modoEscuro: "Modo Oscuro", voltar: "Volver",
        sair: "Salir",
        acessoSubtitulo: "Acceso a la plataforma de estudios",
        rotuloEmailAcesso: "Correo Electrónico",
        placeholderEmailAcesso: "tu@correo.com",
        entrar: "Entrar",
        rotuloQuestao: "Pregunta",
        rotuloPontos: "Puntos",
        rotuloGrupo: "Grupo",
        alternativas: "Alternativas",
        carregandoPergunta: "Cargando Pregunta...",
        suaPontuacao: "Tu Puntuación",
        desempenho: "Rendimiento",
        suasMaterias: "Mis Fases", criarMateria: "Crear nueva fase", minhasMaterias: "Resolver mis fases", favoritas: "Favoritas", gerenciarMaterias: "Gestionar Fases",
        suasFasesTitulo: "Mis Fases", suasFasesSubtitulo: "Crea, organiza y estudia tus fases personalizadas.", voltarSuasFases: "← Volver", abrirListaSubtitulo: "Ve y abre las fases que has creado.", favoritosSubtitulo: "Accede rápidamente a tus fases favoritas.", gerenciarSubtitulo: "Edita, duplica o elimina tus fases.", criarSubtitulo: "Crea una nueva fase con tus propias preguntas.",
        personalizadas: "PERSONALIZADA", semMaterias: "Todavía no has creado ninguna fase.", criarPrimeiraMateria: "Crear mi primera fase",
        novaMateriaTitulo: "Crear nueva fase", editarMateriaTitulo: "Editar Fase", nomeMateria: "Nombre de la materia", descricaoMateria: "Descripción",
        temaMateria: "Tema/categoría", grupoMateria: "Grupo", grupoQuestao: "Grupo", dificuldade: "Dificultad",
        facil: "Fácil", normal: "Normal", dificil: "Difícil", adicionarQuestao: "Añadir pregunta", editar: "Editar", duplicar: "Duplicar", excluir: "Eliminar",
        jogar: "Abrir", favorito: "Favorito", salvar: "Guardar Fase", cancelar: "Cancelar", fechar: "Cerrar", questaoTitulo: "Pregunta",
        enunciadoPT: "Enunciado", enunciadoES: "Enunciado (Español)", respostaPT: "Respuesta Correcta (Português)", respostaES: "Respuesta Correcta (Español)",
        explicacaoPT: "Explicación (Português)", explicacaoES: "Explicación (Español)", alvoPT: "Objetivo", alvoES: "Objetivo (Español)",
        alternativasErradas: "Alternativas incorrectas", alternativasErradasES: "Alternativas incorrectas (Español)", alternativasErradasAjuda: "Completa cada opción en su propio campo. La cuarta opción es opcional.",
        confirmarExcluirMateria: "¿Eliminar esta fase? Sus preguntas también se eliminarán. Esta acción no se puede deshacer.",
        semQuestoes: "Añade al menos una pregunta.", camposObrigatorios: "Completa los campos obligatorios.",
         dashboard: { title: "Continúa con tu estudio", subtitle: "Consulta tu progreso y retoma donde lo dejaste.", next: "SIGUIENTE PASO", performance: "Tu Rendimiento", summary: "Resumen General", answered: "Preguntas Respondidas", correct: "Aciertos", accuracy: "Rendimiento", subjects: "Materias Estudiadas", review: "Modo Revisión", reviewDescription: "Revisa preguntas importantes.", marked: "guardadas", saved: "guardadas", evolution: "Evolución", sessions: "Sesiones Recientes", shareEvolution: "Compartir Evolución", explore: "Explorar Materias", reviewMarked: "Revisar Guardadas", reviewMode: "Modo Revisión", resume: "Continuar", choose: "Elegir Materia", yourPhases: "Tus Fases", startTitle: "Comienza tu primer estudio", startDescription: "Elige una materia para comenzar tu historial.", continueQuestion: "Pregunta", continueStudying: "Continúa estudiando para seguir tu evolución.", recentSessions: "sesiones recientes · rendimiento por sesión", noSaved: "Todavía no has guardado ninguna pregunta.", savedForReview: "pregunta guardada para revisar", savedForReviewPlural: "preguntas guardadas para revisar", wrongQuestions: "Preguntas Incorrectas", savedQuestions: "Preguntas Guardadas", recentQuestions: "Últimas Realizadas" },

    },
    en: {
        tituloDocumento: "Medical Quizzes",
        idiomaTitulo: "SIMUNUS",
        idiomaSubtitulo: "Medical study platform",
        idiomaPergunta: "Choose a language",
        boasTitulo: "Welcome to SIMUNUS",
        boasSubtitulo: "Your study platform",
        boasBotao: "START STUDYING",
        materiasTitulo: "Select a subject",
        materiasSubtitulo: "Choose the subject you want to study.",
        fasesTitulo: "Select a phase",
        fasesSubtitulo: "Choose the phase you want to study.",
        voltarInicio: "Back to start",
        voltarMaterias: "Back to subjects",
        escolherFase: "Choose another phase",
        carregando: "Loading question bank...",
        carregandoPerguntas: "Loading questions...",
        erro404: "Question bank file not found.",
        erroRede: "Could not access the question bank file. Check the path and execution environment.",
        erroJson: "The question bank file does not contain valid JSON.",
        erroEstrutura: "The question bank does not have the expected structure (questions).",
        erroVazio: "The question bank is empty.",
        erroInesperado: "An unexpected error occurred while loading the question bank.",
        erroRuntime: "Could not load this phase's data locally.",
        correto: "✅ Correct!",
        incorreto: "❌ Incorrect.",
        resposta: "The answer is",
        respostaCorreta: "The correct answer is",
        descricao: "Description:",
        alvo: "Target:",
        tipo: "Question",
        proxima: "Next question →",
        final: "🏆 Quiz completed!",
        suaPontuacao: "Your score",
        acertos: "Correct",
        erros: "Incorrect",
        aproveitamento: "Accuracy",
        novamente: "Try Again",
        excelente: "Excellent performance! You demonstrated strong command of the material.",
        muitoBom: "Very good! You performed well, but there are still some points to review.",
        bomComeco: "Good start. It is worth reviewing the points you missed.",
        continueEstudando: "Keep studying. Repeating the quiz can help reinforce the material.",
        configuracoes: "Settings",
        configuracoesSubtitulo: "Customize your experience in the app.",
        aparencia: "Appearance",
        aparenciaDescricao: "Choose the display mode.",
        tamanhoFonte: "Font size",
        tamanhoFonteDescricao: "Adjust the text size for comfortable reading.",
        idiomaConfig: "Language",
        idiomaConfigDescricao: "Currently selected language.",
        segurancaConta: "Account Security",
        segurancaContaDescricao: "Manage your account security and login credentials.",
        redefinirSenha: "Reset Password",
        redefinirSenhaDescricao: "Change your account password.",
        fontePequena: "Small", fonteNormal: "Normal", fonteGrande: "Large", fonteMuitoGrande: "Very large",
        modoClaro: "Light mode", modoEscuro: "Dark mode", voltar: "Back",
        sair: "Sign out",
        acessoSubtitulo: "Access the study platform",
        rotuloEmailAcesso: "Email",
        placeholderEmailAcesso: "your@email.com",
        entrar: "Sign in",
        rotuloQuestao: "Question",
        rotuloPontos: "Points",
        rotuloGrupo: "Group",
        alternativas: "Answer choices",
        carregandoPergunta: "Loading question...",
        desempenho: "Performance",
        suasMaterias: "My Phases", criarMateria: "Create new phase", minhasMaterias: "Practice My Phases", favoritas: "Favorites", gerenciarMaterias: "Manage phases",
        suasFasesTitulo: "My Phases", suasFasesSubtitulo: "Create, organize and study your custom phases.", voltarSuasFases: "← Back", abrirListaSubtitulo: "View and open the phases you created.", favoritosSubtitulo: "Quickly access your favorite phases.", gerenciarSubtitulo: "Edit, duplicate or delete your phases.", criarSubtitulo: "Build a new phase with your own questions.",
        personalizadas: "CUSTOM", semMaterias: "You have not created any phases yet.", criarPrimeiraMateria: "Create my first phase",
        novaMateriaTitulo: "Create new phase", editarMateriaTitulo: "Edit phase", nomeMateria: "Subject name", descricaoMateria: "Description",
        temaMateria: "Topic/category", grupoMateria: "Group", grupoQuestao: "Group", dificuldade: "Difficulty",
        facil: "Easy", normal: "Normal", dificil: "Hard", adicionarQuestao: "Add question", editar: "Edit", duplicar: "Duplicate", excluir: "Delete",
        jogar: "Open", favorito: "Favorite", salvar: "Save phase", cancelar: "Cancel", fechar: "Close",
        questaoTitulo: "Question", enunciadoPT: "Question text (Portuguese)", enunciadoES: "Question text (Spanish)", respostaPT: "Correct answer (Portuguese)",
        respostaES: "Correct answer (Spanish)", explicacaoPT: "Explanation (Portuguese)", explicacaoES: "Explanation (Spanish)", alvoPT: "Objective (Portuguese)", alvoES: "Objective (Spanish)",
        alternativasErradas: "Incorrect choices", alternativasErradasES: "Incorrect choices (Spanish)", alternativasErradasAjuda: "Enter each choice in its own field. The fourth choice is optional.",
        confirmarExcluirMateria: "Delete this phase? Its questions will also be removed. This action cannot be undone.",
        semQuestoes: "Add at least one question.", camposObrigatorios: "Complete the required fields.",
         dashboard: { title: "Keep your study going", subtitle: "Track your progress and pick up where you left off.", next: "NEXT STEP", performance: "Your Performance", summary: "Overview", answered: "Questions Answered", correct: "Correct", accuracy: "Accuracy", subjects: "Subjects Studied", review: "Review Mode", reviewDescription: "Review Important Questions.", marked: "saved", saved: "saved", evolution: "Progress Over Time", sessions: "Recent Sessions", shareEvolution: "Share Progress", explore: "Explore Subjects", reviewMarked: "Review Saved", reviewMode: "Review Mode", resume: "Continue", choose: "Choose Subject", yourPhases: "Your Phases", startTitle: "Start your first study session", startDescription: "Choose a subject to start building your study history.", continueQuestion: "Question", continueStudying: "Keep studying to follow your progress.", recentSessions: "recent sessions · performance by session", noSaved: "You have not saved any questions yet.", savedForReview: "question saved for review", savedForReviewPlural: "questions saved for review", wrongQuestions: "Incorrect questions", savedQuestions: "Saved questions", recentQuestions: "Recently answered" },
    }
};

const textosUI = {
    pt: { back: "Voltar", saveQuestion: "Salvar questão para revisar", removeSavedQuestion: "Remover questão das salvas", saveTitle: "Salvar para revisar", removeSavedTitle: "Remover das questões salvas", shareResult: "Compartilhar resultado", reviewErrors: "Revisar erros", nextPhase: "Próxima fase", doAgain: "Refazer", chooseAnotherPhase: "Escolher outra fase", resultFinished: "🏆 Simulado finalizado!", reviewFinished: "Revisão concluída", phaseFinished: "Fase concluída", time: "Tempo", bestResult: "Melhor resultado", shareTitle: "Compartilhar resultado", shareEvolutionTitle: "Compartilhar progresso", overall: "Geral", bySubject: "Por matéria", shareDevice: "Compartilhar progresso", copyShareText: "Copiar texto", sharePreviewLabel: "Prévia do texto", shareCopied: "Texto copiado!", shareNativeUnavailable: "Compartilhamento nativo não disponível. Texto copiado para a área de transferência.", shareCopyFailed: "Não foi possível copiar o texto.", shareNativeFailed: "Não foi possível abrir o compartilhamento nativo. Texto copiado para a área de transferência.", shareProgressHeader: "📚 Meu progresso na SIMUNUS", shareResultHeader: "🏆 Meu resultado na SIMUNUS", shareAccuracy: "🎯 Aproveitamento", shareQuestionsLabel: "📝 Questões respondidas", shareCorrectLabel: "✅ Acertos", shareErrorsLabel: "❌ Erros", shareBestLabel: "🏅 Melhor resultado", shareSubjectLabel: "📚 Matéria", sharePhaseLabel: "📖 Fase", shareTodayLabel: "📅 Hoje", sharePreviousLabel: "↩️ Resultado anterior", shareChangeLabel: "📈 Evolução", sharePoints: "p.p.", shareNoActivity: "Continue estudando e evoluindo! 🚀", searchResults: "Resultados da pesquisa", noPhases: "Nenhuma fase encontrada.", bestPerformance: "Melhor desempenho", attempt: "tentativa", attempts: "tentativas", question: "questão", questions: "questões", close: "Fechar", wrongQuestions: "Questões Erradas", wrongIntro: "Escolha uma matéria para revisar seus erros ou revise todas as questões erradas.", noWrong: "Você ainda não possui questões erradas para revisar.", reviewAllWrong: "Revisar todas as questões erradas", reportProblem: "Relatar problema", reportQuestion: "Questão", reportPrompt: "Encontrou algum problema nesta questão? Informe abaixo.", customSubject: "Matéria personalizada", customPhase: "Fase personalizada", reviewLoadError: "Não foi possível localizar as questões salvas para revisão. Abra a fase novamente e tente de novo.", reportPlaceholder: "Descreva o problema encontrado nesta questão...", send: "Enviar" },
    es: { back: "Volver", saveQuestion: "Guardar pregunta para revisar", removeSavedQuestion: "Quitar pregunta de las guardadas", saveTitle: "Guardar para revisar", removeSavedTitle: "Quitar de las preguntas guardadas", shareResult: "Compartir resultado", reviewErrors: "Revisar errores", nextPhase: "Siguiente fase", doAgain: "Reintentar", chooseAnotherPhase: "Elegir otra fase", resultFinished: "🏆 ¡Simulado completado!", reviewFinished: "Revisión completada", phaseFinished: "Fase completada", time: "Tiempo", bestResult: "Mejor resultado", shareTitle: "Compartir resultado", shareEvolutionTitle: "Compartir progreso", overall: "General", bySubject: "Por materia", shareDevice: "Compartir progreso", copyShareText: "Copiar texto", sharePreviewLabel: "Vista previa del texto", shareCopied: "¡Texto copiado!", shareNativeUnavailable: "El uso compartido nativo no está disponible. Texto copiado al portapapeles.", shareCopyFailed: "No fue posible copiar el texto.", shareNativeFailed: "No fue posible abrir el uso compartido nativo. Texto copiado al portapapeles.", shareProgressHeader: "📚 Mi progreso en SIMUNUS", shareResultHeader: "🏆 Mi resultado en SIMUNUS", shareAccuracy: "🎯 Rendimiento", shareQuestionsLabel: "📝 Preguntas respondidas", shareCorrectLabel: "✅ Aciertos", shareErrorsLabel: "❌ Errores", shareBestLabel: "🏅 Mejor resultado", shareSubjectLabel: "📚 Materia", sharePhaseLabel: "📖 Fase", shareTodayLabel: "📅 Hoy", sharePreviousLabel: "↩️ Resultado anterior", shareChangeLabel: "📈 Evolución", sharePoints: "p.p.", shareNoActivity: "¡Sigue estudiando y evolucionando! 🚀", searchResults: "Resultados de búsqueda", noPhases: "No se encontraron fases.", bestPerformance: "Mejor rendimiento", attempt: "intento", attempts: "intentos", question: "pregunta", questions: "preguntas", close: "Cerrar", wrongQuestions: "Preguntas incorrectas", wrongIntro: "Elige una materia para revisar tus errores o revisa todas las preguntas incorrectas.", noWrong: "Todavía no tienes preguntas incorrectas para revisar.", reviewAllWrong: "Revisar todas las preguntas incorrectas", reportProblem: "Informar problema", reportQuestion: "Pregunta", reportPrompt: "¿Encontraste algún problema en esta pregunta? Infórmalo abajo.", customSubject: "Materia personalizada", customPhase: "Fase personalizada", reviewLoadError: "No fue posible localizar las preguntas guardadas para revisar. Abre la fase nuevamente e inténtalo de nuevo.", reportPlaceholder: "Describe el problema encontrado en esta pregunta...", send: "Enviar" },
    en: { back: "Back", saveQuestion: "Save question for review", removeSavedQuestion: "Remove question from saved", saveTitle: "Save for review", removeSavedTitle: "Remove from saved questions", shareResult: "Share result", reviewErrors: "Review incorrect", nextPhase: "Next phase", doAgain: "Try Again", chooseAnotherPhase: "Choose another phase", resultFinished: "🏆 Quiz completed!", reviewFinished: "Review completed", phaseFinished: "Phase completed", time: "Time", bestResult: "Best result", shareTitle: "Share result", shareEvolutionTitle: "Share progress", overall: "Overall", bySubject: "By subject", shareDevice: "Share progress", copyShareText: "Copy text", sharePreviewLabel: "Text preview", shareCopied: "Text copied!", shareNativeUnavailable: "Native sharing is not available. Text copied to the clipboard.", shareCopyFailed: "The text could not be copied.", shareNativeFailed: "Native sharing could not be opened. Text copied to the clipboard.", shareProgressHeader: "📚 My progress in SIMUNUS", shareResultHeader: "🏆 My result in SIMUNUS", shareAccuracy: "🎯 Accuracy", shareQuestionsLabel: "📝 Questions answered", shareCorrectLabel: "✅ Correct", shareErrorsLabel: "❌ Errors", shareBestLabel: "🏅 Best result", shareSubjectLabel: "📚 Subject", sharePhaseLabel: "📖 Phase", shareTodayLabel: "📅 Today", sharePreviousLabel: "↩️ Previous result", shareChangeLabel: "📈 Progress", sharePoints: "pp", shareNoActivity: "Keep studying and improving! 🚀", searchResults: "Search results", noPhases: "No phases found.", bestPerformance: "Best performance", attempt: "attempt", attempts: "attempts", question: "question", questions: "questions", close: "Close", wrongQuestions: "Incorrect questions", wrongIntro: "Choose a subject to review your incorrect answers or review all incorrect questions.", noWrong: "You do not have any incorrect questions to review yet.", reviewAllWrong: "Review all incorrect questions", reportProblem: "Report problem", reportQuestion: "Question", reportPrompt: "Found a problem with this question? Tell us below.", customSubject: "Custom subject", customPhase: "Custom phase", reviewLoadError: "Could not locate the saved questions for review. Open the phase again and try again.", reportPlaceholder: "Describe the problem found in this question...", send: "Send" }
};

window.SimunusI18n.register("app", textos);
window.SimunusI18n.register("ui", textosUI);
const ui = () => window.SimunusI18n.messages("ui");

const $ = (id) => document.getElementById(id);

const telaAcesso = $("tela-acesso");
const telaCadastro = $("tela-cadastro");
const telaIdioma = $("tela-idioma");
const telaAcessoPendente = $("tela-acesso-pendente");
const telaRenovarPlano = $("tela-renovar-plano");
const telaBoasVindas = $("tela-boas-vindas");
const telaDashboard = $("tela-dashboard");
const telaMaterias = $("tela-materias");
const telaCriarSimulado = $("tela-criar-simulado");
const telaFases = $("tela-fases");
const telaSuasFases = $("tela-suas-fases");
const telaListaFasesCustom = $("tela-lista-fases-custom");
const telaJogo = $("tela-jogo");
const telaConfiguracoes = $("tela-configuracoes");
const listaMaterias = $("lista-materias");
const listaFases = $("lista-fases");
const mensagemFases = $("mensagem-fases");
const card = document.querySelector(".card");
const resultadoFinal = $("resultado-final");

function t() {
    return window.SimunusI18n.messages("app");
}

function authText(key) {
    const labels = {
        pt: {
            password: "Senha",
            fullName: "Nome Completo",
            fullNamePlaceholder: "Digite seu nome completo",
            birthDate: "Data de Nascimento",
            phone: "Telefone / WhatsApp",
            country: "País",
            countryPlaceholder: "Selecione seu país",
            institution: "Universidade / Instituição",
            institutionPlaceholder: "Digite sua universidade ou instituição",
            optional: "(opcional)",
            signupNameError: "Informe seu nome completo (3 a 150 caracteres).",
            signupEmailError: "Informe um e-mail válido.",
            signupPasswordError: "A senha deve ter ao menos 6 caracteres.",
            signupBirthError: "Informe uma data válida, entre 1900 e hoje.",
            signupPhoneError: "Informe um número válido para o código selecionado.",
            phoneHint: "Selecione o código do país do seu telefone.",
            dialLabel: "Código internacional do telefone",
            signupInstitutionError: "O nome da instituição deve ter até 200 caracteres.",

            passwordPlaceholder: "Senha",
            createAccount: "Criar Conta",
            createSubtitle: "Crie sua conta SIMUNUS",
            confirmPassword: "Confirmar Senha",
            confirmPasswordPlaceholder: "Confirmar senha",
            haveAccount: "Já tenho uma conta - Entrar",
            differentPasswords: "As senhas não coincidem.",
            accountCreated: "Conta criada. Entre com seu e-mail e senha.",
            pendingTitle: "Solicitar acesso",
            pendingText: "Sua conta foi criada! Entre em contato com nossa equipe pelo WhatsApp para solicitar a ativação do acesso aos simulados.",
            pendingNote: "Nossa equipe orientará você sobre os planos e as formas de pagamento.",
            couponLabel: "Possui um cupom de desconto?",
            couponPlaceholder: "Digite seu cupom",
            couponDescription: "Digite seu código antes de entrar em contato com o suporte.",
            couponHelper: "O desconto será aplicado após a validação do cupom.",
            couponValidate: "Validar",
            couponValidating: "Validando cupom...",
            couponValid: "Cupom válido: {code}.",
            couponInvalid: "Cupom inválido ou indisponível.",
            couponLimited: "Limite de tentativas atingido. Tente novamente mais tarde.",
            couponError: "Não foi possível validar o cupom. Tente novamente.",
            couponWhatsapp: "Cupom informado: {code}",
            couponOpening: "Abrindo WhatsApp...",
            supportMessage: "Olá! Criei minha conta no Simunus e gostaria de solicitar a ativação do meu acesso. Poderiam me orientar sobre os planos disponíveis e as formas de pagamento?",
            accessErrorText: "Não foi possível verificar seu acesso aos simulados. Tente novamente.",
            renewalTitle: "Renovar plano",
            renewalText: "Seu período de acesso terminou. Renove seu plano para continuar estudando no Simunus.",
            renewalNote: "Seu histórico e progresso permanecem salvos.",
            renewalMessage: "Olá! Já tive um plano ativo no Simunus, mas meu acesso expirou. Gostaria de renovar meu plano. Poderiam me orientar sobre os planos e as formas de pagamento?",
            blockedTitle: "Acesso indisponível",
            blockedText: "Não foi possível liberar seu acesso. Entre em contato com a equipe para esclarecer sua situação.",
            verify: "Verificar acesso",
            verifying: "Verificando seu acesso...",
            stillPending: "Seu acesso ainda não foi liberado.",
            support: "Entrar em contato com o suporte"
        },
        es: {
            password: "Contraseña",
            fullName: "Nombre Completo",
            fullNamePlaceholder: "Escribe tu nombre completo",
            birthDate: "Fecha de Nacimiento",
            phone: "Teléfono / WhatsApp",
            country: "País",
            countryPlaceholder: "Selecciona tu país",
            institution: "Universidad / Institución",
            institutionPlaceholder: "Escribe tu universidad o institución",
            optional: "(opcional)",
            signupNameError: "Introduce tu nombre completo (3 a 150 caracteres).",
            signupEmailError: "Introduce un correo válido.",
            signupPasswordError: "La contraseña debe tener al menos 6 caracteres.",
            signupBirthError: "Introduce una fecha válida, entre 1900 y hoy.",
            signupPhoneError: "Introduce un número válido para el código seleccionado.",
            phoneHint: "Selecciona el código de país de tu teléfono.",
            dialLabel: "Código internacional del teléfono",
            signupInstitutionError: "El nombre de la institución debe tener hasta 200 caracteres.",

            passwordPlaceholder: "Contraseña",
            createAccount: "Crear cuenta",
            createSubtitle: "Crea tu cuenta SIMUNUS",
            confirmPassword: "Confirmar Contraseña",
            confirmPasswordPlaceholder: "Confirmar contraseña",
            haveAccount: "Ya tengo una cuenta - Entrar",
            differentPasswords: "Las contraseñas no coinciden.",
            accountCreated: "Cuenta creada. Entra con tu correo y contraseña.",
            pendingTitle: "Solicitar acceso",
            pendingText: "¡Tu cuenta fue creada! Comunícate con nuestro equipo por WhatsApp para solicitar la activación del acceso a los simulacros.",
            pendingNote: "Nuestro equipo te orientará sobre los planes y los métodos de pago.",
            couponLabel: "¿Tienes un cupón de descuento?",
            couponPlaceholder: "Ingresa tu cupón",
            couponDescription: "Ingresa tu código antes de contactar con soporte.",
            couponHelper: "El descuento se aplicará después de validar el cupón.",
            couponValidate: "Validar",
            couponValidating: "Validando cupón...",
            couponValid: "Cupón válido: {code}.",
            couponInvalid: "Cupón no válido o no disponible.",
            couponLimited: "Demasiados intentos. Inténtalo más tarde.",
            couponError: "No fue posible validar el cupón. Inténtalo de nuevo.",
            couponWhatsapp: "Cupón indicado: {code}",
            couponOpening: "Abriendo WhatsApp...",
            supportMessage: "¡Hola! Creé mi cuenta en Simunus y me gustaría solicitar la activación de mi acceso. ¿Podrían informarme sobre los planes disponibles y los métodos de pago?",
            accessErrorText: "No fue posible verificar tu acceso a los simulados. Inténtalo nuevamente.",
            renewalTitle: "Renovar plan",
            renewalText: "Tu período de acceso terminó. Renueva tu plan para seguir estudiando en Simunus.",
            renewalNote: "Tu historial y progreso permanecen guardados.",
            renewalMessage: "¡Hola! Ya tuve un plan activo en Simunus, pero mi acceso expiró. Me gustaría renovar mi plan. ¿Podrían informarme sobre los planes y los métodos de pago?",
            blockedTitle: "Acceso no disponible",
            blockedText: "No fue posible habilitar tu acceso. Contacta con nuestro equipo para aclarar tu situación.",
            verify: "Verificar acceso",
            verifying: "Verificando tu acceso...",
            stillPending: "Tu acceso todavía no está habilitado.",
            support: "Contactar con soporte"
        },
        en: {
            password: "Password",
            fullName: "Full Name",
            fullNamePlaceholder: "Enter your full name",
            birthDate: "Date of Birth",
            phone: "Phone / WhatsApp",
            country: "Country",
            countryPlaceholder: "Select your country",
            institution: "University / Institution",
            institutionPlaceholder: "Enter your university or institution",
            optional: "(optional)",
            signupNameError: "Enter your full name (3–150 characters).",
            signupEmailError: "Enter a valid email address.",
            signupPasswordError: "Password must contain at least 6 characters.",
            signupBirthError: "Enter a valid date between 1900 and today.",
            signupPhoneError: "Enter a valid number for the selected calling code.",
            phoneHint: "Select your phone number’s country calling code.",
            dialLabel: "Phone country calling code",
            signupInstitutionError: "Institution name must be at most 200 characters.",

            passwordPlaceholder: "Password",
            createAccount: "Create account",
            createSubtitle: "Create your SIMUNUS account",
            confirmPassword: "Confirm Password",
            confirmPasswordPlaceholder: "Confirm password",
            haveAccount: "I already have an account - Sign in",
            differentPasswords: "Passwords do not match.",
            accountCreated: "Account created. Sign in with your email and password.",
            pendingTitle: "Request access",
            pendingText: "Your account has been created! Contact our team on WhatsApp to request access to the practice exams.",
            pendingNote: "Our team will guide you through the available plans and payment methods.",
            couponLabel: "Have a discount code?",
            couponPlaceholder: "Enter your coupon",
            couponDescription: "Enter your code before contacting support.",
            couponHelper: "The discount will be applied after the coupon is validated.",
            couponValidate: "Validate",
            couponValidating: "Validating coupon...",
            couponValid: "Valid coupon: {code}.",
            couponInvalid: "Invalid or unavailable coupon.",
            couponLimited: "Too many attempts. Try again later.",
            couponError: "Could not validate the coupon. Please try again.",
            couponWhatsapp: "Coupon code: {code}",
            couponOpening: "Opening WhatsApp...",
            supportMessage: "Hello! I created my Simunus account and would like to request access activation. Could you tell me about the available plans and payment methods?",
            accessErrorText: "We could not verify your access to simulations. Please try again.",
            renewalTitle: "Renew plan",
            renewalText: "Your access period has ended. Renew your plan to keep studying with Simunus.",
            renewalNote: "Your study history and progress remain saved.",
            renewalMessage: "Hello! I previously had an active Simunus plan, but my access has expired. I would like to renew my plan. Could you explain the available plans and payment methods?",
            blockedTitle: "Access unavailable",
            blockedText: "We could not enable your access. Contact our team to clarify your account status.",
            verify: "Check access",
            verifying: "Checking your access...",
            stillPending: "Your access has not been enabled yet.",
            support: "Contact support"
        }
    };
    window.SimunusI18n.register("auth", labels);
    return window.SimunusI18n.t("auth", key);
}

/* ============================================================
   PROGRESSO DE ESTUDO — persistência compatível com o storage atual
   Os bancos originais continuam sendo a fonte única das questões.
   ============================================================ */
const CHAVE_ESTUDO_PREFIXO = "simunus-study-progress-v1:";
let dadosEstudo = criarDadosEstudoVazios();
const referenciasQuestaoRevisao = new WeakMap();
let sessaoEstudo = { respostas: [], inicio: 0, modo: "normal", refs: [], resumeIndex: null, completionRecorded: false };

function criarDadosEstudoVazios() {
    return { version: 1, questions: {}, bookmarks: {} };
}

function chaveEstudoAtual() {
    let usuario = "guest";
    try { usuario = window.Auth?.getCurrentEmail?.() || "guest"; } catch (_) {}
    return CHAVE_ESTUDO_PREFIXO + encodeURIComponent(String(usuario).toLowerCase());
}

function carregarDadosEstudo() {
    try {
        const salvo = JSON.parse(localStorage.getItem(chaveEstudoAtual()) || "null");
        dadosEstudo = salvo && typeof salvo === "object" && salvo.version === 1
            ? { ...criarDadosEstudoVazios(), questions: salvo.questions || {}, bookmarks: salvo.bookmarks || {} }
            : criarDadosEstudoVazios();
    } catch (_) { dadosEstudo = criarDadosEstudoVazios(); }
    return dadosEstudo;
}

function salvarDadosEstudo() {
    try { localStorage.setItem(chaveEstudoAtual(), JSON.stringify(dadosEstudo)); }
    catch (erro) { console.warn("Não foi possível persistir o progresso de estudos neste navegador.", erro); }
}

function idOriginalQuestao(q) {
    return q?.id ?? q?.questionId ?? q?.codigo ?? q?.questionIdPT ?? q?.questionIdES ?? q?.questionIdEN ?? null;
}

function referenciaQuestao(q, index = estado.perguntaAtual) {
    if (q && typeof q === "object" && referenciasQuestaoRevisao.has(q)) return { ...referenciasQuestaoRevisao.get(q) };
    const customId = estado.customSubjectId || estado.customPhaseId || null;
    const id = idOriginalQuestao(q);
    const texto = obterTraducao(q, "pergunta") || q?.pergunta || q?.perguntaPT || q?.nome || "";
    return {
        subjectId: estado.materiaId || null, phaseNumber: estado.faseNumero ?? null, customSubjectId: customId,
        questionId: id == null ? null : String(id), fallbackText: id == null ? String(texto).slice(0, 180) : null,
        fallbackIndex: id == null ? index : null
    };
}

function chaveReferencia(ref) {
    return [ref?.customSubjectId || ref?.subjectId || "sem-materia", ref?.phaseNumber ?? "custom", ref?.questionId ?? `text:${ref?.fallbackText || ""}:${ref?.fallbackIndex ?? ""}`].join("::");
}

function chaveQuestaoAtual(q = estado.perguntas[estado.perguntaAtual], index = estado.perguntaAtual) {
    return chaveReferencia(referenciaQuestao(q, index));
}

function chaveFase(materiaId = estado.materiaId, faseNumero = estado.faseNumero, customId = estado.customSubjectId) {
    return customId ? `custom:${customId}` : `${materiaId || ""}:${faseNumero ?? ""}`;
}

function nomeMateriaPorId(materiaId) {
    if (!materiaId) return ui().customSubject;
    const custom = CustomPhases.getSubjectById(materiaId);
    if (custom) return custom.name || ui().customSubject;
    const area = (estado.catalogoAcademico || []).find((row) => String(row.area_id) === String(materiaId));
    return area?.area_name || String(materiaId);
}

function nomeFasePorReferencia(ref) {
    if (ref.customSubjectId) return CustomPhases.getSubjectById(ref.customSubjectId)?.name || ui().customPhase;
    const topico = (estado.catalogoAcademico || []).find((row) => String(row.topic_id) === String(ref.topicId || ref.topic_id || ""));
    if (topico?.topic_name) return String(topico.topic_name);
    return `Fase ${ref.phaseNumber}`;
}

// Os favoritos oficiais são identificados pelo question_id, não pelo índice
// ou pela posição de uma questão em determinada tentativa.
const identidadesFavoritosSupabase = new Map();
let favoritosSupabaseIds = new Set();
let favoritosSupabaseCarregados = false;
let favoritosSupabaseCarregando = null;
let salvamentoFavoritoEmAndamento = false;

function questaoOficialAtual() {
    const q = estado.perguntas?.[estado.perguntaAtual];
    return q?.attempt_question_id && estado.simuladoSupabase ? q : null;
}

async function carregarFavoritosSupabase(forcar = false) {
    if (!forcar && favoritosSupabaseCarregados) return favoritosSupabaseIds;
    if (favoritosSupabaseCarregando) return favoritosSupabaseCarregando;
    favoritosSupabaseCarregando = (async () => {
        const ids = new Set();
        for (let offset = 0; offset <= 10000; offset += 50) {
            const pagina = await window.SimunusApi.getMyBookmarkedQuestions(50, offset);
            if (!Array.isArray(pagina)) throw new Error("Invalid bookmarks response");
            for (const item of pagina) if (item?.question_id) ids.add(item.question_id);
            if (pagina.length < 50) break;
            if (offset === 10000) throw new Error("Bookmarks pagination limit reached");
        }
        favoritosSupabaseIds = ids;
        favoritosSupabaseCarregados = true;
        return ids;
    })();
    try { return await favoritosSupabaseCarregando; }
    finally { favoritosSupabaseCarregando = null; }
}

async function obterIdentidadeFavoritoSupabase(q) {
    const attemptQuestionId = q?.attempt_question_id;
    if (!attemptQuestionId) throw new Error("Missing attempt question ID");
    if (!identidadesFavoritosSupabase.has(attemptQuestionId)) {
        const promise = window.SimunusApi.getAttemptQuestionIdentity(attemptQuestionId)
            .then(result => {
                const item = Array.isArray(result) ? result[0] : result;
                if (!item?.question_id) throw new Error("Question identity unavailable");
                return item.question_id;
            });
        identidadesFavoritosSupabase.set(attemptQuestionId, promise);
        promise.catch(() => {
            if (identidadesFavoritosSupabase.get(attemptQuestionId) === promise)
                identidadesFavoritosSupabase.delete(attemptQuestionId);
        });
    }
    return identidadesFavoritosSupabase.get(attemptQuestionId);
}

function desenharBotaoMarcacao(marcado, carregando = false) {
    const botao = $("marcar-questao");
    if (!botao) return;
    botao.disabled = carregando || salvamentoFavoritoEmAndamento;
    botao.classList.toggle("is-bookmarked", Boolean(marcado));
    botao.setAttribute("aria-pressed", String(Boolean(marcado)));
    botao.setAttribute("aria-label", marcado ? ui().removeSavedQuestion : ui().saveQuestion);
    botao.title = marcado ? ui().removeSavedTitle : ui().saveTitle;
    const svg = botao.querySelector("svg");
    if (svg) svg.setAttribute("fill", marcado ? "currentColor" : "none");
}

function atualizarBotaoMarcacao() {
    const q = estado.perguntas?.[estado.perguntaAtual];
    if (!$("marcar-questao") || !q) return;
    if (questaoOficialAtual()) {
        // Evita exibir a marcação da questão anterior enquanto consulta a atual.
        desenharBotaoMarcacao(false, true);
        Promise.all([carregarFavoritosSupabase(), obterIdentidadeFavoritoSupabase(q)])
            .then(([ids, questionId]) => {
                if (questaoOficialAtual() === q) desenharBotaoMarcacao(ids.has(questionId));
            })
            .catch(erro => {
                console.error("[Favoritos] Não foi possível consultar a marcação.", erro);
                if (questaoOficialAtual() === q) desenharBotaoMarcacao(false, true);
            });
        return;
    }
    desenharBotaoMarcacao(Boolean(dadosEstudo.bookmarks[chaveQuestaoAtual(q)]));
}

function normalizarPercentualVisual(valor) {
    const numero = Number(valor);
    if (!Number.isFinite(numero)) return 0;
    return Math.max(0, Math.min(100, numero));
}

function estatisticaAreaDashboard(areaId) {
    const areas = Array.isArray(estado.dashboardEstudo?.areas) ? estado.dashboardEstudo.areas : [];
    return areas.find((item) => String(item.area_id) === String(areaId)) || null;
}

function estatisticaTopicoDashboard(topicId) {
    const topicos = Array.isArray(estado.dashboardEstudo?.topics) ? estado.dashboardEstudo.topics : [];
    return topicos.find((item) => String(item.topic_id) === String(topicId)) || null;
}

async function carregarDashboardEstudo() {
    if (!window.SimunusApi?.isReady?.() || typeof window.SimunusApi.getMyStudyDashboard !== "function") {
        estado.dashboardEstudo = null;
        return null;
    }
    estado.dashboardEstudo = await window.SimunusApi.getMyStudyDashboard();
    return estado.dashboardEstudo;
}

async function atualizarDashboard() {
    const shareActions = $("compartilhar-evolucao")?.closest(".dashboard-share-actions");
    if (shareActions) shareActions.hidden = true;
    $("botao-continuar").hidden = true;
    const dashboardSupabase = await carregarDashboardEstudo();

    const labels = t().dashboard;
    $("titulo-dashboard").textContent = labels.title;
    $("titulo-continuar").closest(".dashboard-continue").querySelector(".dashboard-kicker").textContent = labels.next;
    $("titulo-resumo").textContent = labels.performance;

$("titulo-resumo").closest(".dashboard-section-head").querySelector(".dashboard-summary-label").textContent = labels.summary;
$("dashboard-suas-fases")
    .querySelector("span").textContent = labels.yourPhases;
    $("stat-respondidas").previousElementSibling.textContent = labels.answered;
    $("stat-acertos").previousElementSibling.textContent = labels.correct;
    $("stat-aproveitamento").previousElementSibling.textContent = labels.accuracy;
    $("stat-materias").previousElementSibling.textContent = labels.subjects;
    $("titulo-revisao").textContent = labels.review;
    $("descricao-revisao").textContent = labels.reviewDescription;
    $("titulo-evolucao").textContent = labels.evolution;
    $("titulo-evolucao").closest(".dashboard-section-head").querySelector(".dashboard-sessions-label").textContent = labels.sessions;
    $("dashboard-explorar-materias")
    .querySelector("span").textContent = labels.explore;
$("dashboard-suas-fases")
    .querySelector("span").textContent = labels.yourPhases;
    $("dashboard-voltar-boas").setAttribute("aria-label", ui().back);
    $("dashboard-voltar-boas").title = ui().back;
    $("compartilhar-evolucao").querySelector("span").textContent = labels.shareEvolution;
    const summary = dashboardSupabase?.summary || {};
    const answered = Number(summary.answered_questions) || 0;
    const correct = Number(summary.correct_answers) || 0;
    const accuracy = Number(summary.accuracy_percentage) || 0;
    const studiedAreas = Number(summary.studied_areas) || 0;

    $("stat-respondidas").textContent = answered;
    $("stat-acertos").textContent = correct;
    $("stat-aproveitamento").textContent = `${Number.isInteger(accuracy) ? accuracy : accuracy.toFixed(2)}%`;
    $("stat-materias").textContent = studiedAreas;

    // A RPC de última atividade pode retornar um ponteiro antigo mesmo
    // quando o Dashboard não possui questões efetivamente respondidas.
    // Nesse caso, mostrar o estado inicial em vez de sugerir continuação.
    await atualizarContinuarSupabase(answered > 0);

    try { await atualizarContagensRevisaoSupabase(); }
    catch (erro) { console.warn("[Revisão] Contagens indisponíveis", erro); }

    const history = $("dashboard-historico");
    if (shareActions) shareActions.hidden = answered <= 0;
    const sessions = Array.isArray(dashboardSupabase?.evolution)
        ? dashboardSupabase.evolution
            .slice()
            .sort((a, b) => Date.parse(a.submitted_at || 0) - Date.parse(b.submitted_at || 0))
            .slice(-6)
        : [];

    history.replaceChildren();

    if (!sessions.length) {
        const empty = document.createElement("p");
        empty.textContent = labels.continueStudying;
        history.appendChild(empty);
    } else {
        const bars = document.createElement("div");
        bars.className = "historico-barras";

        sessions.forEach((item, i) => {
            const scoreRaw = Number(item.accuracy_percentage) || 0;
            const score = Math.max(0, Math.min(100, scoreRaw));
            const scoreText = Number.isInteger(score) ? String(score) : score.toFixed(2);
            const column = document.createElement("div");
            column.className = "historico-coluna";
            column.title = `${labels.evolution} ${i + 1}: ${scoreText}%`;

            const wrap = document.createElement("div");
            wrap.className = "historico-barra-wrap";
            const bar = document.createElement("span");
            bar.className = "historico-barra";
            bar.style.height = `${Math.max(4, score)}%`;
            wrap.appendChild(bar);

            const number = document.createElement("small");
            number.textContent = String(i + 1);
            const value = document.createElement("strong");
            value.textContent = `${scoreText}%`;

            column.append(wrap, number, value);
            bars.appendChild(column);
        });

        const legend = document.createElement("p");
        legend.className = "historico-legenda";
        legend.textContent = sessions.length < 2
            ? labels.continueStudying
            : `${sessions.length} ${labels.recentSessions}`;

        history.append(bars, legend);
    }
}

async function abrirDashboard(registrarHistorico = true) {
    $("botao-continuar").hidden = true;
    mostrarTela(telaDashboard, registrarHistorico);

    try {
        await atualizarDashboard();
    } catch (erro) {
        console.error("Não foi possível atualizar o Dashboard.", erro);
    }
}

// Revisões oficiais: somente RPCs autenticadas do Supabase.
let contagensRevisaoSupabase = null;
let modalidadeRevisaoSelecionada = null;
let revisaoIniciando = false;
const textosRevisaoSupabase = {
    pt: { quantity: "Quantidade de Questões", start: "Iniciar Revisão", empty: "Não há questões disponíveis nesta categoria.", loading: "Carregando revisão…", unavailable: "A quantidade selecionada excede as questões disponíveis.", confirm: "Finalizar a revisão com questões sem resposta?", custom: "Informe uma quantidade entre 1 e 100." },
    en: { quantity: "Number of questions", start: "Start review", empty: "No questions available in this category.", loading: "Loading review…", unavailable: "The selected quantity exceeds the available questions.", confirm: "Finish the review with unanswered questions?", custom: "Enter a number between 1 and 100." },
    es: { quantity: "Cantidad de preguntas", start: "Iniciar revisión", empty: "No hay preguntas disponibles en esta categoría.", loading: "Cargando revisión…", unavailable: "La cantidad seleccionada supera las preguntas disponibles.", confirm: "¿Finalizar la revisión con preguntas sin responder?", custom: "Introduce una cantidad entre 1 y 100." }
};
const textosLayoutRevisao = {
    pt: { hints: { wrong: "Revise seus erros", bookmarked: "Questões que você marcou", recent: "Revise questões recentes" }, subtitle: "Escolha as questões que deseja revisar", all: "Todas disponíveis", custom: "Personalizada", available: n => `${n} ${n === 1 ? "Questão Disponível" : "Questões Disponíveis"}`, minus: "Diminuir quantidade", plus: "Aumentar quantidade" },
    en: { hints: { wrong: "Review your mistakes", bookmarked: "Questions you saved", recent: "Review recent questions" }, subtitle: "Choose the questions you want to review", all: "All available", custom: "Custom", available: n => `${n} questions available`, minus: "Decrease quantity", plus: "Increase quantity" },
    es: { hints: { wrong: "Repasa tus errores", bookmarked: "Preguntas que guardaste", recent: "Repasa preguntas recientes" }, subtitle: "Elige las preguntas que deseas repasar", all: "Todas disponibles", custom: "Personalizada", available: n => `${n} preguntas disponibles`, minus: "Disminuir cantidad", plus: "Aumentar cantidad" }
};
function atualizarLayoutRevisao() {
    const tr = textosLayoutRevisao[estado.idioma] || textosLayoutRevisao.pt;
    for (const modo of ["wrong", "bookmarked", "recent"]) {
        const botao = document.querySelector(`[data-review-mode="${modo}"]`);
        if (!botao) continue;
        botao.querySelector('.review-card-label').textContent = ({wrong:t().dashboard.wrongQuestions,bookmarked:t().dashboard.savedQuestions,recent:t().dashboard.recentQuestions})[modo];
        botao.querySelector('.review-card-count').textContent = contagensRevisaoSupabase ? String(totalRevisaoDisponivel(modo)) : '—';
        botao.querySelector('[data-review-hint]').textContent = tr.hints[modo];
        botao.setAttribute('aria-pressed', String(modalidadeRevisaoSelecionada === modo));
        botao.classList.toggle('is-selected', modalidadeRevisaoSelecionada === modo);
    }
    const description = $("descricao-revisao");
    if (description) description.textContent = tr.subtitle;
    const painelQuantidade = $("selecao-quantidade-revisao");
    if (painelQuantidade) painelQuantidade.hidden = !modalidadeRevisaoSelecionada || totalRevisaoDisponivel(modalidadeRevisaoSelecionada) === 0;
    const select = $("quantidade-revisao");
    if (select) { select.querySelector('[value="custom"]').textContent = tr.custom; select.querySelector('[value="all"]').textContent = tr.all; }
    $("rotulo-quantidade-revisao").textContent = textoRevisaoSupabase().quantity;
    $("iniciar-revisao-supabase").textContent = textoRevisaoSupabase().start;
    $("review-minus").setAttribute('aria-label',tr.minus);
    $("review-plus").setAttribute('aria-label',tr.plus);
    atualizarControleQuantidadeRevisao();
}
function atualizarControleQuantidadeRevisao() {
    const select = $("quantidade-revisao"), input = $("quantidade-revisao-personalizada");
    if (!select || !input) return;
    const total = totalRevisaoDisponivel(modalidadeRevisaoSelecionada);
    const previousValue = select.value;
    select.querySelectorAll('option[value^="fixed:"]').forEach(option => {
        option.hidden = Number(option.value.slice(6)) > total;
        option.disabled = option.hidden;
    });
    if (select.selectedOptions[0]?.disabled) {
        const valid = [...select.options].find(option => option.value.startsWith('fixed:') && !option.disabled);
        select.value = valid?.value || (total > 0 ? 'all' : 'custom');
    }
    const custom = select.value === 'custom';
    $("review-custom-stepper").hidden = !custom;
    input.max = String(Math.min(100, total));
    if (custom && total > 0 && (!Number.isInteger(Number(input.value)) || Number(input.value) < 1 || Number(input.value) > Math.min(100,total))) input.value = String(Math.min(100,total));
    $("review-minus").disabled = !custom || Number(input.value) <= 1;
    $("review-plus").disabled = !custom || Number(input.value) >= Math.min(100,total);
    const tr = textosLayoutRevisao[estado.idioma] || textosLayoutRevisao.pt;
    $("review-limit").textContent = tr.available(total);
    const requested = select.value.startsWith('fixed:') ? Number(select.value.slice(6)) : custom ? Number(input.value) : total;
    $("iniciar-revisao-supabase").disabled = revisaoIniciando || !total || !Number.isInteger(requested) || requested < 1 || requested > total;
}
function textoRevisaoSupabase() { return textosRevisaoSupabase[estado.idioma] || textosRevisaoSupabase.pt; }
function totalRevisaoDisponivel(modo) {
    const chave = { wrong: "wrong_count", recent: "recent_count", bookmarked: "bookmarked_count" }[modo];
    return Number(contagensRevisaoSupabase?.[chave]) || 0;
}
async function atualizarContagensRevisaoSupabase() {
    const retorno = await window.SimunusApi.getMyReviewCounts();
    contagensRevisaoSupabase = Array.isArray(retorno) ? retorno[0] : retorno;
    // A quantidade de questões salvas já é exibida no cartão correspondente.
    atualizarLayoutRevisao();
}
async function iniciarModoRevisao(modo) {
    const mensagem = $("mensagem-revisao");
    try {
        if (!contagensRevisaoSupabase) await atualizarContagensRevisaoSupabase();
        modalidadeRevisaoSelecionada = modo;
        const total = totalRevisaoDisponivel(modo);
        const painel = $("selecao-quantidade-revisao");
        painel.hidden = total === 0;
        mensagem.textContent = total ? "" : textoRevisaoSupabase().empty;

        $("quantidade-revisao").value = total >= 10 ? "fixed:10" : "all";
        $("quantidade-revisao-personalizada").value = String(Math.min(100, Math.max(1,total)));
        atualizarLayoutRevisao();
    } catch (erro) {
        mensagem.textContent = window.SimunusApi.friendlyMessage(erro, idiomaBackend());
    }
}
async function confirmarInicioRevisaoSupabase() {
    if (revisaoIniciando || !modalidadeRevisaoSelecionada) return;
    const total = totalRevisaoDisponivel(modalidadeRevisaoSelecionada);
    const selecionado = $("quantidade-revisao").value;
    let modoSelecao, quantidade = null;
    if (selecionado === "all") modoSelecao = "all";
    else if (selecionado === "custom") {
        modoSelecao = "custom";
        quantidade = Number($("quantidade-revisao-personalizada").value);
        if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 100) {
            $("mensagem-revisao").textContent = textoRevisaoSupabase().custom; return;
        }
    } else {
        modoSelecao = "fixed";
        quantidade = Number(selecionado.split(":")[1]);
    }
    if (!total || (quantidade !== null && quantidade > total)) {
        $("mensagem-revisao").textContent = textoRevisaoSupabase().unavailable; return;
    }
    revisaoIniciando = true;
    const botao = $("iniciar-revisao-supabase");
    botao.disabled = true;
    $("mensagem-revisao").textContent = textoRevisaoSupabase().loading;
    try {
        const attemptId = await window.SimunusApi.startReviewAttempt(modalidadeRevisaoSelecionada, modoSelecao, quantidade);
        await carregarTentativaSupabase(attemptId, {
            source: "review", mode: "immediate_feedback", reviewType: modalidadeRevisaoSelecionada,
            title: t().dashboard.review, description: t().dashboard.reviewDescription
        });
        $("mensagem-revisao").textContent = "";
    } catch (erro) {
        console.error("[Revisão] Falha ao iniciar ou retomar.", erro);
        $("mensagem-revisao").textContent = window.SimunusApi.friendlyMessage(erro, idiomaBackend());
    } finally { revisaoIniciando = false; botao.disabled = false; }
}

async function alternarMarcacaoQuestao() {
    const q = estado.perguntas?.[estado.perguntaAtual];
    if (!q || salvamentoFavoritoEmAndamento) return;
    if (questaoOficialAtual()) {
        salvamentoFavoritoEmAndamento = true;
        desenharBotaoMarcacao(false, true);
        try {
            const [ids, questionId] = await Promise.all([
                carregarFavoritosSupabase(), obterIdentidadeFavoritoSupabase(q)
            ]);
            const jaSalvo = ids.has(questionId);
            const resultado = jaSalvo
                ? await window.SimunusApi.removeQuestionBookmark(questionId)
                : await window.SimunusApi.addQuestionBookmark(q.attempt_question_id);
            // Booleano indica alteração efetiva; reconcilia sempre com o servidor.
            if (typeof resultado !== "boolean") throw new Error("Unexpected bookmark response");
            favoritosSupabaseCarregados = false;
            await carregarFavoritosSupabase(true);
            contagensRevisaoSupabase = null;
            try { await atualizarContagensRevisaoSupabase(); }
            catch (erro) { console.warn("[Favoritos] Contagem não atualizada.", erro); }
        } catch (erro) {
            console.error("[Favoritos] Erro ao salvar ou remover questão.", erro);
            favoritosSupabaseCarregados = false;
            alert(window.SimunusApi.friendlyMessage(erro, idiomaBackend()));
        } finally {
            salvamentoFavoritoEmAndamento = false;
            if (questaoOficialAtual()) atualizarBotaoMarcacao();
        }
        return;
    }
    // Compatibilidade apenas com telas legadas sem tentativa Supabase.
    const ref = referenciaQuestao(q, estado.perguntaAtual);
    const key = chaveReferencia(ref);
    if (dadosEstudo.bookmarks[key]) delete dadosEstudo.bookmarks[key];
    else dadosEstudo.bookmarks[key] = ref;
    salvarDadosEstudo();
    atualizarBotaoMarcacao();
}

function escaparHTML(valor) {
    return String(valor ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

const DURACAO_TRANSICAO_LOGO = 2000;
const EASING_TRANSICAO_LOGO = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const globalSimunusLogo = document.getElementById("global-simunus-logo");

let currentLogoAnimation = null;
let navegacaoLogoEmCurso = 0;
let transicaoLogoAtiva = null;

function todasAsLogosAncora() {
    return document.querySelectorAll(".logo-simunus");
}

function obterAncoraDaTela(tela) {
    return tela?.querySelector(".logo-simunus") || null;
}

function sincronizarAssetDaLogoGlobal() {
    if (!globalSimunusLogo) return;
    const escuro = document.documentElement.dataset.tema === "escuro";
    const caminho = escuro
        ? globalSimunusLogo.dataset.logoDark
        : globalSimunusLogo.dataset.logoLight;
    if (caminho && globalSimunusLogo.getAttribute("src") !== caminho) {
        globalSimunusLogo.setAttribute("src", caminho);
    }
}

function cancelarAnimacaoDaLogoGlobal() {
    if (!currentLogoAnimation) return;
    currentLogoAnimation.cancel();
    currentLogoAnimation = null;
}

function definirVisibilidadeDaAncora(logo, visivel) {
    if (!logo) return;
    if (visivel) {
        logo.style.setProperty("visibility", "visible", "important");
        logo.setAttribute("aria-hidden", "false");
    } else {
        logo.style.setProperty("visibility", "hidden", "important");
        logo.setAttribute("aria-hidden", "true");
    }
}

function prepararLogoGlobalParaTransicao(rect) {
    if (!globalSimunusLogo || !rect?.width || !rect?.height) return false;
    sincronizarAssetDaLogoGlobal();
    globalSimunusLogo.style.setProperty("position", "fixed", "important");
    Object.assign(globalSimunusLogo.style, {
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        transform: "translate3d(0, 0, 0) scale(1)",
        opacity: "1"
    });
    globalSimunusLogo.style.setProperty("visibility", "visible", "important");
    return true;
}

function esconderTodasAsLogosAncora() {
    todasAsLogosAncora().forEach((logo) => definirVisibilidadeDaAncora(logo, false));
}

function mostrarLogoDaTela(tela) {
    const ancora = obterAncoraDaTela(tela);
    if (!ancora) return false;
    definirVisibilidadeDaAncora(ancora, true);
    return true;
}

function limparCamadaGlobalDaLogo() {
    if (!globalSimunusLogo) return;
    cancelarAnimacaoDaLogoGlobal();
    globalSimunusLogo.style.setProperty("visibility", "hidden", "important");
    globalSimunusLogo.style.removeProperty("position");
    globalSimunusLogo.style.removeProperty("left");
    globalSimunusLogo.style.removeProperty("top");
    globalSimunusLogo.style.removeProperty("width");
    globalSimunusLogo.style.removeProperty("height");
    globalSimunusLogo.style.removeProperty("transform");
    globalSimunusLogo.style.removeProperty("opacity");
}

function handoffLogoParaTela(tela) {
    // O target é revelado primeiro, ainda exatamente sob a logo global.
    mostrarLogoDaTela(tela);
    // Só depois a camada fixed deixa de existir visualmente e tem seus
    // estilos temporários removidos.
    limparCamadaGlobalDaLogo();
}

function prepararEstadoNormalInicial() {
    if (!globalSimunusLogo) return;
    limparCamadaGlobalDaLogo();
    const telaInicial = [
        telaAcesso,
        telaIdioma,
        telaBoasVindas,
        telaDashboard,
        telaMaterias,
        telaCriarSimulado,
        telaSuasFases,
        telaListaFasesCustom,
        telaFases,
        telaJogo,
        telaConfiguracoes
    ].find((item) => item?.classList.contains("tela-visivel"));
    if (telaInicial) mostrarLogoDaTela(telaInicial);
}

function aguardarLayoutEstavel() {
    return new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
}

function trocarTelaNormal(telas, tela, transicaoInstantanea = false, transicaoPosBoasVindas = false) {
    telas.forEach((item) => {
        const ativa = item === tela;
        item.classList.toggle("escondido", !ativa);
        item.classList.toggle("tela-visivel", ativa);
        item.classList.toggle("transicao-tela-instantanea", ativa && transicaoInstantanea);
        item.classList.toggle("transicao-tela-pos-boas", ativa && transicaoPosBoasVindas);
    });
}

function obterEstadoVisualAtualDaLogo() {
    if (!globalSimunusLogo) return null;
    const visibilidade = getComputedStyle(globalSimunusLogo).visibility;
    if (visibilidade !== "visible") return null;
    const rect = globalSimunusLogo.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    return {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
    };
}

async function iniciarAnimacaoLogoGlobal(origemRect, destinoRect, duracao = DURACAO_TRANSICAO_LOGO) {
    if (!globalSimunusLogo || !origemRect || !destinoRect) return false;

    cancelarAnimacaoDaLogoGlobal();
    if (!prepararLogoGlobalParaTransicao(origemRect)) return false;

    // Fixe o frame de origem antes de iniciar a animação. Animar as quatro
    // dimensões/coordenadas reais evita o salto causado por scale() sobre
    // uma caixa que já pode estar transformada por uma navegação interrompida.
    globalSimunusLogo.getBoundingClientRect();
    const animacao = globalSimunusLogo.animate([
        {
            left: `${origemRect.left}px`,
            top: `${origemRect.top}px`,
            width: `${origemRect.width}px`,
            height: `${origemRect.height}px`,
            transform: "none"
        },
        {
            left: `${destinoRect.left}px`,
            top: `${destinoRect.top}px`,
            width: `${destinoRect.width}px`,
            height: `${destinoRect.height}px`,
            transform: "none"
        }
    ], {
        duration: duracao,
        easing: EASING_TRANSICAO_LOGO,
        fill: "forwards",
        composite: "replace"
    });

    currentLogoAnimation = animacao;

    try {
        await animacao.finished;
    } catch {
        // cancel() é esperado quando uma nova navegação substitui esta.
        return false;
    }

    if (currentLogoAnimation !== animacao) return false;

    // O frame final continua aplicado enquanto o handoff é preparado.
    // Não resetamos transform antes de revelar o target.
    currentLogoAnimation = animacao;
    return true;
}

function transicaoLogoPermitida(telaAtual, telaDestino) {
    if (!telaAtual || !telaDestino || telaAtual === telaDestino) return false;

    // A animação da logo pertence exclusivamente ao fluxo inicial e termina
    // quando a tela de Boas-vindas é alcançada. Nenhuma navegação posterior
    // captura ou calcula a posição da logo global.
    return (
        ((telaAtual === telaAcesso || telaAtual === telaCadastro) && telaDestino === telaBoasVindas) ||
        (telaAtual === telaAcesso && telaDestino === telaIdioma) ||
        (telaAtual === telaIdioma && telaDestino === telaBoasVindas)
    );
}

function transicaoDeTelaPosBoasVindas(telaAtual, telaDestino) {
    if (!telaAtual || !telaDestino || telaAtual === telaDestino) return false;

    // Depois de Boas-vindas, somente a própria tela participa da transição.
    // A logo permanece na âncora normal da tela e nunca entra na camada global.
    return telaAtual !== telaAcesso && telaDestino !== telaAcesso;
}

async function mostrarTela(tela, registrarHistorico = true) {
    if (tela === telaIdioma) tela = telaBoasVindas;
    const telas = [
        telaAcesso,
        telaCadastro,
        telaIdioma,
        telaAcessoPendente,
        telaRenovarPlano,
        telaBoasVindas,
        telaDashboard,
        telaMaterias,
        telaSuasFases,
        telaListaFasesCustom,
        telaFases,
        telaJogo,
        telaConfiguracoes
    ].filter(Boolean);

    const telaAtual = telas.find((item) => item.classList.contains("tela-visivel"));
    if (registrarHistorico && telaAtual && telaAtual !== tela) {
        const ultima = historicoTelas[historicoTelas.length - 1];
        if (ultima !== telaAtual) historicoTelas.push(telaAtual);
    }
    const ancoraAtual = obterAncoraDaTela(telaAtual);
    const ancoraDestino = obterAncoraDaTela(tela);
    const idNavegacao = ++navegacaoLogoEmCurso;
    const deveConsiderarAnimacaoLogo = transicaoLogoPermitida(telaAtual, tela);

    /*
     * A posição da logo global só é consultada quando a transição realmente
     * pertence ao fluxo que termina em Boas-vindas. Depois disso, nenhuma
     * navegação calcula getBoundingClientRect() para a trajetória da logo.
     */
    let origemRect = null;
    if (deveConsiderarAnimacaoLogo) {
        origemRect = obterEstadoVisualAtualDaLogo();
        if (!origemRect && ancoraAtual) origemRect = ancoraAtual.getBoundingClientRect();
    }

    cancelarAnimacaoDaLogoGlobal();
    transicaoLogoAtiva = null;

    const deveAnimar = Boolean(
        deveConsiderarAnimacaoLogo &&
        globalSimunusLogo &&
        telaAtual &&
        telaAtual !== tela &&
        ancoraAtual &&
        ancoraDestino &&
        origemRect?.width &&
        origemRect?.height
    );

    if (!deveAnimar) {
        /*
         * Depois de Boas-vindas a camada global nunca participa da troca.
         * Primeiro devolvemos a logo ao controle da âncora normal e somente
         * então trocamos a tela, evitando qualquer frame intermediário.
         */
        limparCamadaGlobalDaLogo();
        esconderTodasAsLogosAncora();

        const usarTransicaoDeTela = transicaoDeTelaPosBoasVindas(telaAtual, tela);
        trocarTelaNormal(telas, tela, false, usarTransicaoDeTela);

        const ancoraFinal = obterAncoraDaTela(tela);
        if (ancoraFinal) definirVisibilidadeDaAncora(ancoraFinal, true);
        return;
    }

    /*
     * A logo global assume a posição real da origem ANTES de esconder as
     * âncoras. Assim não existe sequer um estado de renderização no qual
     * todas as representações da logo estejam ocultas.
     */
    if (!prepararLogoGlobalParaTransicao(origemRect)) return;
    esconderTodasAsLogosAncora();

    trocarTelaNormal(telas, tela);
    await aguardarLayoutEstavel();

    if (idNavegacao !== navegacaoLogoEmCurso) return;

    const destinoRect = ancoraDestino.getBoundingClientRect();
    if (!destinoRect.width || !destinoRect.height) {
        esconderTodasAsLogosAncora();
        mostrarLogoDaTela(tela);
        limparCamadaGlobalDaLogo();
        return;
    }

    /*
     * Origem e destino ficam congelados para esta transição. O scroll não
     * recalcula a trajetória: se o usuário interagir com a página durante
     * a animação, o listener de scroll aborta a camada global e entrega a
     * logo diretamente à âncora da tela atual.
     */
    transicaoLogoAtiva = {
        id: idNavegacao,
        telaDestino: tela,
        destinoRect: {
            left: destinoRect.left,
            top: destinoRect.top,
            width: destinoRect.width,
            height: destinoRect.height
        }
    };

    const terminou = await iniciarAnimacaoLogoGlobal(origemRect, destinoRect, DURACAO_TRANSICAO_LOGO);

    if (idNavegacao !== navegacaoLogoEmCurso) return;

    if (!terminou) {
        transicaoLogoAtiva = null;
        esconderTodasAsLogosAncora();
        mostrarLogoDaTela(tela);
        limparCamadaGlobalDaLogo();
        return;
    }

    /*
     * Handoff atômico: a âncora recebe a visibilidade antes de a camada
     * global ser desmontada. Assim a logo nunca volta a um estado "topo".
     */
    transicaoLogoAtiva = null;
    mostrarLogoDaTela(tela);
    limparCamadaGlobalDaLogo();
}
function atualizarIdiomaDaPagina() {
    document.documentElement.lang = estado.idioma === "es" ? "es" : estado.idioma === "en" ? "en" : "pt-BR";
    document.title = t().tituloDocumento;
}

const CHAVE_TEMA = "simulados-medicina-theme";

function temaAtual() {
    return document.documentElement.dataset.tema === "escuro" ? "escuro" : "claro";
}

const ICONE_TEMA_MOON = '<svg class="lucide lucide-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.985 12.486A9 9 0 1 1 11.514 3.015 7 7 0 0 0 20.985 12.486z"></path></svg>';
const ICONE_TEMA_SUN = '<svg class="lucide lucide-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
const ICONE_UI = {
    sparkles: '<svg class="lucide lucide-sparkles" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3Z"></path><path d="m19 14-.75 2.25L16 17l2.25.75L19 20l.75-2.25L22 17l-2.25-.75L19 14Z"></path></svg>',
    plus: '<svg class="lucide lucide-plus" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>',
    arrowLeft: '<svg class="lucide lucide-arrow-left" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>',
    arrowRight: '<svg class="lucide lucide-arrow-right" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>',
    x: '<svg class="lucide lucide-x" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
    copy: '<svg class="lucide lucide-copy" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect width="13" height="13" x="9" y="9" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
    star: '<svg class="lucide lucide-star" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    trash: '<svg class="lucide lucide-trash-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>'
};

function aplicarTema(tema, persistir = true) {
    const novoTema = tema === "escuro" ? "escuro" : "claro";
    document.documentElement.dataset.tema = novoTema;
    const escuro = novoTema === "escuro";

    document.querySelectorAll(".logo-simunus").forEach((logo) => {
        const caminho = escuro ? logo.dataset.logoDark : logo.dataset.logoLight;
        if (caminho && logo.getAttribute("src") !== caminho) logo.setAttribute("src", caminho);
    });
    sincronizarAssetDaLogoGlobal();

    document.querySelectorAll(".botao-tema:not([data-language-trigger])").forEach((botao) => {
        botao.setAttribute("aria-pressed", String(escuro));
        const icone = botao.querySelector(".tema-icone");
        if (icone) icone.innerHTML = escuro ? ICONE_TEMA_SUN : ICONE_TEMA_MOON;
        botao.setAttribute("aria-label", escuro ? t().modoClaro : t().modoEscuro);
        botao.title = escuro ? t().modoClaro : t().modoEscuro;
    });

    if (persistir) {
        try { localStorage.setItem(CHAVE_TEMA, novoTema); } catch (erro) {
            console.warn("Não foi possível persistir a preferência de tema.", erro);
        }
    }
}

function alternarTema() {
    aplicarTema(temaAtual() === "escuro" ? "claro" : "escuro");
}

function carregarTemaSalvo() {
    let salvo = null;
    try {
        const armazenado = localStorage.getItem(CHAVE_TEMA);
        if (armazenado === "escuro" || armazenado === "claro") salvo = armazenado;
    } catch (erro) {
        console.warn("Não foi possível ler a preferência de tema.", erro);
    }

    if (salvo) {
        aplicarTema(salvo, false);
        return;
    }

    const prefereEscuro = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    aplicarTema(prefereEscuro ? "escuro" : "claro", false);
}

function acompanharPreferenciaDeTemaDoSistema() {
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!media) return;
    const sincronizar = (event) => {
        try {
            if (localStorage.getItem(CHAVE_TEMA)) return;
        } catch (_) {
            aplicarTema(event.matches ? "escuro" : "claro", false);
            return;
        }
        aplicarTema(event.matches ? "escuro" : "claro", false);
    };
    if (typeof media.addEventListener === "function") media.addEventListener("change", sincronizar);
    else if (typeof media.addListener === "function") media.addListener(sincronizar);
}

const CHAVE_FONTE = "simunus-font-scale";

function fonteAtual() {
    const valor = Number(document.documentElement.style.getPropertyValue("--font-scale"));
    return Number.isFinite(valor) && valor > 0 ? valor : 1;
}

function aplicarFonte(valor, persistir = true) {
    let novoValor = Number(valor);
    if (!Number.isFinite(novoValor)) novoValor = 1;
    novoValor = Math.min(1.30, Math.max(0.85, novoValor));
    document.documentElement.style.setProperty("--font-scale", novoValor.toFixed(2));
    const slider = $("slider-fonte");
    if (slider) slider.value = novoValor.toFixed(2);
    if (persistir) {
        try { localStorage.setItem(CHAVE_FONTE, novoValor.toFixed(2)); } catch (erro) {
            console.warn("Não foi possível persistir a preferência de fonte.", erro);
        }
    }
}

function carregarFonteSalva() {
    let salvo = 1;
    try {
        const valor = localStorage.getItem(CHAVE_FONTE);
        if (valor !== null && Number.isFinite(Number(valor))) salvo = Number(valor);
        else {
            // Migração transparente das preferências antigas.
            const legado = localStorage.getItem("simulados-medicina-font-size");
            const mapa = { pequena: .92, normal: 1, grande: 1.10, "muito-grande": 1.22 };
            if (legado && mapa[legado]) salvo = mapa[legado];
        }
    } catch (erro) {
        console.warn("Não foi possível ler a preferência de fonte.", erro);
    }
    aplicarFonte(salvo, false);
}

function atualizarConfiguracoes() {
    const escuro = temaAtual() === "escuro";
    const botao = $("alternar-tema-config");
    if (botao) {
        botao.textContent = escuro ? t().modoClaro : t().modoEscuro;
        botao.setAttribute("aria-pressed", String(escuro));
    }
    $("titulo-configuracoes").textContent = t().configuracoes;
    $("subtitulo-configuracoes").textContent = t().configuracoesSubtitulo;
    $("rotulo-aparencia").textContent = t().aparencia;
    $("descricao-aparencia").textContent = t().aparenciaDescricao;
    $("rotulo-fonte").textContent = t().tamanhoFonte;
    $("descricao-fonte").textContent = t().tamanhoFonteDescricao;
    $("rotulo-idioma-config").textContent = t().idiomaConfig;
    $("descricao-idioma-config").textContent = t().idiomaConfigDescricao;
    $("rotulo-seguranca-conta").textContent = t().segurancaConta;
    $("descricao-seguranca-conta").textContent = t().segurancaContaDescricao;
    $("rotulo-redefinir-senha").textContent = t().redefinirSenha;
    $("descricao-redefinir-senha").textContent = t().redefinirSenhaDescricao;
    document.querySelectorAll(".botao-idioma-config").forEach((botao) => {
        const ativo = botao.dataset.configIdioma === estado.idioma;
        botao.classList.toggle("ativo", ativo);
        botao.setAttribute("aria-pressed", String(ativo));
    });
    const slider = $("slider-fonte");
    if (slider) slider.value = fonteAtual().toFixed(2);
    $("sair-conta-texto").textContent = t().sair;
}

function atualizarSaudacaoAcesso() {
    let conhecido = false;
    try { conhecido = localStorage.getItem("simunus_login_anterior_v1") === "1"; } catch (_) {}
    const idioma = estado.idioma || "pt";
    const mensagens = {
        pt: conhecido ? "Bem-vindo de volta" : "Bem-vindo ao Simunus",
        en: conhecido ? "Welcome back" : "Welcome to Simunus",
        es: conhecido ? "Bienvenido de nuevo" : "Bienvenido a Simunus"
    };
    const elemento = $("saudacao-acesso");
    if (elemento) elemento.textContent = mensagens[idioma] || mensagens.pt;
}

function atualizarTextosDeAcesso() {
    atualizarSaudacaoAcesso();
    const idiomaLogin = estado.idioma || "pt";
    $("texto-ou-acesso").textContent = {pt:"OU",en:"OR",es:"O"}[idiomaLogin] || "OU";
    $("rodape-acesso").textContent = {pt:"Estude, pratique e acompanhe sua evolução.",en:"Study, practice, and track your progress.",es:"Estudia, practica y sigue tu progreso."}[idiomaLogin] || "Estude, pratique e acompanhe sua evolução.";
    $("esqueci-senha-acesso").textContent = {pt:"Esqueceu a senha?",en:"Forgot password?",es:"¿Olvidaste tu contraseña?"}[idiomaLogin] || "Esqueceu a senha?";
    $("titulo-acesso").textContent = "SIMUNUS";
    $("subtitulo-acesso").textContent = t().acessoSubtitulo;
    $("rotulo-email-acesso").textContent = t().rotuloEmailAcesso;
    $("email-acesso").placeholder = t().placeholderEmailAcesso;
    $("rotulo-senha-acesso").textContent = authText("password");
    $("senha-acesso").placeholder = authText("passwordPlaceholder");
    $("botao-entrar").textContent = t().entrar;
    $("alternar-modo-acesso").textContent = authText("createAccount");
    $("alternar-tema-acesso")?.setAttribute("aria-label", temaAtual() === "escuro" ? t().modoClaro : t().modoEscuro);
    $("titulo-cadastro").textContent = authText("createAccount");
    $("subtitulo-cadastro").textContent = authText("createSubtitle");
    const signupFields = [
        ["rotulo-nome-cadastro", "fullName", "nome-cadastro", "fullNamePlaceholder"],
        ["rotulo-nascimento-cadastro", "birthDate", null, null],
        ["rotulo-telefone-cadastro", "phone", "telefone-cadastro", null],
        ["rotulo-pais-cadastro", "country", null, null],
        ["rotulo-instituicao-cadastro", "institution", "instituicao-cadastro", "institutionPlaceholder"]
    ];
    for (const [labelId, labelKey, inputId, placeholderKey] of signupFields) {
        const label = $(labelId)?.querySelector(".cadastro-label-texto");
        if (label) label.textContent = authText(labelKey);
        if (inputId && placeholderKey) $(inputId).placeholder = authText(placeholderKey);
    }
    document.querySelectorAll("#tela-cadastro .cadastro-opcional").forEach(el => el.textContent = " " + authText("optional"));
    $("ajuda-telefone-cadastro").textContent = authText("phoneHint");
    $("ddi-cadastro").setAttribute("aria-label", authText("dialLabel"));
    $("ddi-cadastro").title = authText("dialLabel");
    const campoPais = $("pais-cadastro");
    if (campoPais) {
        campoPais.options[0].textContent = authText("countryPlaceholder");
        if (typeof Intl.DisplayNames === "function") {
            const locale = {pt:"pt-BR",en:"en",es:"es"}[estado.idioma] || "pt-BR";
            const names = new Intl.DisplayNames([locale], {type:"region"});
            for (let i = 1; i < campoPais.options.length; i++) {
                const option = campoPais.options[i];
                try { option.textContent = names.of(option.value) || option.textContent; } catch (_) {}
            }
            const options = Array.from(campoPais.options).slice(1).sort((a,b) => a.textContent.localeCompare(b.textContent,locale));
            for (const option of options) campoPais.appendChild(option);
        }
    }

    $("rotulo-email-cadastro").querySelector(".cadastro-label-texto").textContent = t().rotuloEmailAcesso;
    $("email-cadastro").placeholder = t().placeholderEmailAcesso;
    $("rotulo-senha-cadastro").querySelector(".cadastro-label-texto").textContent = authText("password");
    $("senha-cadastro").placeholder = authText("passwordPlaceholder");
    $("rotulo-confirmar-senha-cadastro").querySelector(".cadastro-label-texto").textContent = authText("confirmPassword");
    $("confirmar-senha-cadastro").placeholder = authText("confirmPasswordPlaceholder");
    $("botao-criar-conta").textContent = authText("createAccount");
    $("voltar-login-cadastro").textContent = authText("haveAccount");
    $("alternar-tema-cadastro")?.setAttribute("aria-label", temaAtual() === "escuro" ? t().modoClaro : t().modoEscuro);
    $("titulo-acesso-pendente").textContent = authText("pendingTitle");
    $("texto-acesso-pendente").textContent = authText("pendingText");
    $("observacao-acesso-pendente").textContent = authText("pendingNote");
    $("rotulo-cupom-contato").textContent = authText("couponLabel");
    $("descricao-cupom-contato").textContent = authText("couponDescription");
    $("texto-ajuda-cupom-contato").textContent = authText("couponHelper");
    $("codigo-cupom-contato").placeholder = authText("couponPlaceholder");
    $("validar-cupom-contato").textContent = authText("couponValidate");
    if (couponContactState.validCode) {
        setCouponContactFeedback(authText("couponValid").replace("{code}", couponContactState.validCode), "success");
    } else if (couponContactState.feedbackKey) {
        setCouponContactFeedback(authText(couponContactState.feedbackKey), couponContactState.feedbackKind);
    }
    $("texto-botao-whatsapp-suporte").textContent = authText("support");
    $("botao-whatsapp-suporte").removeAttribute("href");
    $("titulo-renovar-plano").textContent = authText("renewalTitle");
    $("texto-renovar-plano").textContent = authText("renewalText");
    $("observacao-renovar-plano").textContent = authText("renewalNote");
    $("texto-botao-whatsapp-renovacao").textContent = authText("support");
    $("botao-whatsapp-renovacao").removeAttribute("href");
    $("verificar-acesso").textContent = authText("verify");
    $("verificar-renovacao").textContent = authText("verify");
}

function mostrarMensagemDeAcesso(codigo) {
    const mensagem = $("mensagem-acesso");
    if (!mensagem) return;

    // Código vazio = limpar a mensagem
    mensagem.dataset.languageCode = codigo || "";
    if (!codigo) {
        mensagem.textContent = "";
        mensagem.dataset.tipo = "";
        return;
    }

    const mensagens = {
        pt: {
            empty: "Digite seu e-mail.",
            invalid: "Digite um e-mail válido.",
            "not-found": "E-mail não autorizado.",
            inactive: "Acesso não autorizado.",
            expired: "Seu acesso expirou.",
            "empty-password": "Digite sua senha.",
            "invalid-credentials": "E-mail ou senha inválidos.",
            "email-not-confirmed": "Confirme seu e-mail antes de entrar.",
            "rate-limited": "Muitas tentativas. Aguarde um pouco e tente novamente.",
            "weak-password": "A senha deve ter pelo menos 6 caracteres.",
            "signup-confirm-email": "Conta criada. Confirme seu e-mail antes de entrar.",
            "email-already-registered": "Este e-mail já está registrado. Entre com sua senha.",
            "session-replaced": "Sua sessão foi aberta em outro dispositivo. Entre novamente para continuar.",
            "load-error": "Não foi possível verificar o acesso. Tente novamente."
        },
        es: {
            empty: "Introduce tu correo electrónico.",
            invalid: "Introduce un correo electrónico válido.",
            "not-found": "Correo electrónico no autorizado.",
            inactive: "Acceso no autorizado.",
            expired: "Tu acceso ha expirado.",
            "empty-password": "Introduce tu contraseña.",
            "invalid-credentials": "Correo electrónico o contraseña inválidos.",
            "email-not-confirmed": "Confirma tu correo electrónico antes de entrar.",
            "rate-limited": "Demasiados intentos. Espera un poco e inténtalo nuevamente.",
            "weak-password": "La contraseña debe tener al menos 6 caracteres.",
            "signup-confirm-email": "Cuenta creada. Confirma tu correo electrónico antes de entrar.",
            "email-already-registered": "Este correo electrónico ya está registrado. Entra con tu contraseña.",
            "session-replaced": "Tu sesión se abrió en otro dispositivo. Inicia sesión nuevamente para continuar.",
            "load-error": "No fue posible verificar el acceso. Inténtalo de nuevo."
        },
        en: {
            empty: "Enter your email address.",
            invalid: "Enter a valid email address.",
            "not-found": "Email address not authorized.",
            inactive: "Access not authorized.",
            expired: "Your access has expired.",
            "empty-password": "Enter your password.",
            "invalid-credentials": "Invalid email or password.",
            "email-not-confirmed": "Confirm your email before signing in.",
            "rate-limited": "Too many attempts. Please wait and try again.",
            "weak-password": "Password must be at least 6 characters.",
            "signup-confirm-email": "Account created. Confirm your email before signing in.",
            "email-already-registered": "This email is already registered. Sign in with your password.",
            "session-replaced": "Your session was opened on another device. Sign in again to continue.",
            "load-error": "Could not verify access. Please try again."
        }
    };

    const idiomaMensagens = mensagens[estado.idioma] || mensagens.pt;

    mensagem.textContent =
        idiomaMensagens[codigo] || idiomaMensagens["load-error"];

    mensagem.dataset.tipo = codigo;
}

function textoMensagemDeAcesso(codigo) {
    const temporaria = $("mensagem-acesso");
    const textoAtual = temporaria?.textContent || "";
    const tipoAtual = temporaria?.dataset.tipo || "";
    const codigoAtual = temporaria?.dataset.languageCode || "";
    mostrarMensagemDeAcesso(codigo);
    const texto = temporaria?.textContent || "";
    if (temporaria) { temporaria.textContent = textoAtual; temporaria.dataset.tipo = tipoAtual; temporaria.dataset.languageCode = codigoAtual; }
    return texto;
}

let acessoEmAndamento = false;

function atualizarEstadoBotaoEntrar() {
    const email = $("email-acesso").value.trim();
    const senha = $("senha-acesso").value;
    const botao = $("botao-entrar");

    botao.disabled = acessoEmAndamento || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !senha;
}

async function processarAcesso(event) {
    event.preventDefault();
    const campo = $("email-acesso");
    const campoSenha = $("senha-acesso");
    const botao = $("botao-entrar");
    const email = campo.value;
    const senha = campoSenha.value;
    mostrarMensagemDeAcesso("");
    acessoEmAndamento = true;
atualizarEstadoBotaoEntrar();
    campo.disabled = true;
    campoSenha.disabled = true;

    const resultado = await Auth.authenticate(email, senha);
    if (resultado.ok) {
        try { localStorage.setItem("simunus_login_anterior_v1", "1"); } catch (_) {}
        atualizarSaudacaoAcesso();
        $("mensagem-acesso").textContent = "";
        $("mensagem-acesso").dataset.tipo = "";
        campo.value = "";
        campoSenha.value = "";
        carregarDadosEstudo();
        await CustomPhases.refreshFromSupabase();
        estado.materiaId = null;
        limparEstadoDoQuestionario();
        historicoTelas.length = 0;
        await iniciarFluxoComIdiomaPersistente();
    } else {
        mostrarMensagemDeAcesso(resultado.code);
    }

    campo.disabled = false;
campoSenha.disabled = false;

acessoEmAndamento = false;
atualizarEstadoBotaoEntrar();
}

function limparMensagensCadastro() {
    for (const id of ["mensagem-cadastro", "mensagem-confirmar-senha"]) { delete $(id).dataset.authKey; delete $(id).dataset.backendCode; }
    $("mensagem-cadastro").textContent = "";
    $("mensagem-cadastro").dataset.tipo = "";
    $("mensagem-confirmar-senha").textContent = "";
    $("confirmar-senha-cadastro").removeAttribute("aria-invalid");
}

function abrirCadastro() {
    limparMensagensCadastro();
    $("mensagem-acesso").textContent = "";
    $("mensagem-acesso").dataset.tipo = "";
    $("email-cadastro").value = $("email-acesso").value;
    $("senha-cadastro").value = "";
    $("confirmar-senha-cadastro").value = "";
    ["nome-cadastro", "nascimento-cadastro", "telefone-cadastro", "pais-cadastro", "instituicao-cadastro"].forEach(id => $(id).value = "");
    ddiAlteradoManualmente = false;
    atualizarDdiCadastro("BR");
    mostrarTela(telaCadastro);
}

function voltarParaLoginCadastro() {
    limparMensagensCadastro();
    mostrarTela(telaAcesso);
}

// DDIs apresentados separadamente do país de residência. Não são usados para autorização.
const CODIGOS_TELEFONE = [
    ["BR", "+55", "31 99999-9999", "Brazil"], ["BO", "+591", "71234567", "Bolivia"],
    ["US", "+1", "202 555 0123", "United States"], ["CA", "+1", "416 555 0123", "Canada"],
    ["AR", "+54", "11 2345 6789", "Argentina"], ["CL", "+56", "9 1234 5678", "Chile"],
    ["CO", "+57", "300 123 4567", "Colombia"], ["PE", "+51", "912 345 678", "Peru"],
    ["PY", "+595", "981 123456", "Paraguay"], ["UY", "+598", "91 234 567", "Uruguay"],
    ["EC", "+593", "99 123 4567", "Ecuador"], ["VE", "+58", "412 1234567", "Venezuela"],
    ["MX", "+52", "55 1234 5678", "Mexico"], ["CR", "+506", "8888 8888", "Costa Rica"],
    ["PA", "+507", "6123 4567", "Panama"], ["GT", "+502", "5123 4567", "Guatemala"],
    ["CU", "+53", "5 1234567", "Cuba"], ["DO", "+1", "809 555 0123", "Dominican Republic"],
    ["PT", "+351", "912 345 678", "Portugal"], ["ES", "+34", "612 345 678", "Spain"],
    ["FR", "+33", "6 12 34 56 78", "France"], ["DE", "+49", "151 23456789", "Germany"],
    ["IT", "+39", "312 345 6789", "Italy"], ["GB", "+44", "7700 900123", "United Kingdom"],
    ["IE", "+353", "85 123 4567", "Ireland"], ["CH", "+41", "79 123 45 67", "Switzerland"],
    ["NL", "+31", "6 12345678", "Netherlands"], ["BE", "+32", "470 12 34 56", "Belgium"],
    ["AT", "+43", "664 1234567", "Austria"], ["SE", "+46", "70 123 45 67", "Sweden"],
    ["NO", "+47", "412 34 567", "Norway"], ["DK", "+45", "20 12 34 56", "Denmark"],
    ["FI", "+358", "40 1234567", "Finland"], ["PL", "+48", "512 345 678", "Poland"],
    ["TR", "+90", "532 123 4567", "Turkey"], ["RU", "+7", "912 345 67 89", "Russia"],
    ["UA", "+380", "67 123 4567", "Ukraine"], ["IN", "+91", "98765 43210", "India"],
    ["CN", "+86", "138 0013 8000", "China"], ["JP", "+81", "90 1234 5678", "Japan"],
    ["KR", "+82", "10 1234 5678", "South Korea"], ["AU", "+61", "412 345 678", "Australia"],
    ["NZ", "+64", "21 123 4567", "New Zealand"], ["ZA", "+27", "82 123 4567", "South Africa"],
    ["AO", "+244", "923 123 456", "Angola"], ["MZ", "+258", "84 123 4567", "Mozambique"],
    ["CV", "+238", "991 12 34", "Cape Verde"], ["NG", "+234", "803 123 4567", "Nigeria"],
    ["EG", "+20", "100 123 4567", "Egypt"], ["MA", "+212", "612 345678", "Morocco"],
    ["IL", "+972", "50 123 4567", "Israel"], ["AE", "+971", "50 123 4567", "United Arab Emirates"],
    ["SA", "+966", "50 123 4567", "Saudi Arabia"], ["ID", "+62", "812 3456 7890", "Indonesia"],
    ["PH", "+63", "917 123 4567", "Philippines"], ["TH", "+66", "81 234 5678", "Thailand"],
    ["SG", "+65", "8123 4567", "Singapore"]
];
let ddiAlteradoManualmente = false;
function bandeiraTelefone(pais) {
    return /^[A-Z]{2}$/.test(pais) ? String.fromCodePoint(...Array.from(pais, letra => letra.charCodeAt(0) + 127397)) : "🌐";
}
function atualizarDdiCadastro(pais, manual = false) {
    const selector = $("ddi-cadastro");
    if (!selector) return;
    if (manual) ddiAlteradoManualmente = true;
    const registro = CODIGOS_TELEFONE.find(item => item[0] === pais);
    if (!registro || !Array.from(selector.options).some(item => item.value === pais)) return;
    selector.value = pais;
    $("telefone-cadastro").placeholder = registro[2];
}
function iniciarTelefoneCadastro() {
    const selector = $("ddi-cadastro");
    if (!selector) return;
    selector.replaceChildren();
    const locale = {pt:"pt-BR",en:"en",es:"es"}[estado.idioma] || "pt-BR";
    const regionNames = typeof Intl.DisplayNames === "function" ? new Intl.DisplayNames([locale], {type:"region"}) : null;
    const sorted = [...CODIGOS_TELEFONE].sort((a,b) => {
        const name = x => { try {return regionNames?.of(x[0]) || x[3];} catch (_) {return x[3];} };
        return name(a).localeCompare(name(b),locale);
    });
    for (const item of sorted) {
        const option = document.createElement("option");
        option.value = item[0];
        option.textContent = `${bandeiraTelefone(item[0])} ${item[1]}`;
        try {option.title = regionNames?.of(item[0]) || item[3];} catch (_) {option.title = item[3];}
        selector.appendChild(option);
    }
    const other = document.createElement("option");
    other.value = "OTHER";
    other.textContent = "🌐 +…";
    selector.appendChild(other);
    atualizarDdiCadastro(selector.value || "BR");
    selector.value = "BR";
    $("telefone-cadastro").placeholder = CODIGOS_TELEFONE[0][2];
    selector.addEventListener("change", () => {
        ddiAlteradoManualmente = true;
        if (selector.value === "OTHER") {
            $("telefone-cadastro").placeholder = "+12345678900";
        } else atualizarDdiCadastro(selector.value, true);
    });
    $("pais-cadastro").addEventListener("change", () => {
        if (!ddiAlteradoManualmente) atualizarDdiCadastro($("pais-cadastro").value);
    });
}

function normalizarTelefoneCadastro(value) {
    const raw = value.trim();
    if (!raw) return "";
    const digits = raw.replace(/[\s().-]/g, "");
    const ddi = $("ddi-cadastro").value;
    if (ddi === "OTHER") {
        return /^\+[1-9][0-9]{7,14}$/.test(digits) ? digits : null;
    }
    const entry = CODIGOS_TELEFONE.find(item => item[0] === ddi);
    if (!entry || !/^[0-9]+$/.test(digits)) return null;
    // É permitido digitar tanto o número nacional como um número internacional.
    let national = digits;
    if (national.startsWith(entry[1])) national = national.slice(entry[1].length);
    else if (national.startsWith("+")) return null;
    // Brasil: exige DDD + nove dígitos (celular) ou oito (fixo), sem 0 de operadora.
    if (ddi === "BR" && !/^[1-9][0-9][2-9][0-9]{7,8}$/.test(national)) return null;
    // Bolívia: números nacionais com oito dígitos.
    if (ddi === "BO" && !/^[2-9][0-9]{7}$/.test(national)) return null;
    // EUA/Canadá: NPA-NXX-XXXX, com 10 dígitos.
    if (["US", "CA"].includes(ddi) && !/^[2-9][0-9]{2}[2-9][0-9]{6}$/.test(national)) return null;
    if (ddi === "PT" && !/^[29][0-9]{8}$/.test(national)) return null;
    const formatted = entry[1] + national;
    return /^\+[1-9][0-9]{7,14}$/.test(formatted) ? formatted : null;
}

function validarCadastro() {
    const name = $("nome-cadastro").value.trim().replace(/\s+/g, " ");
    const email = $("email-cadastro").value.trim();
    const password = $("senha-cadastro").value;
    const confirmation = $("confirmar-senha-cadastro").value;
    const birth = $("nascimento-cadastro").value;
    const phone = normalizarTelefoneCadastro($("telefone-cadastro").value);
    const country = $("pais-cadastro").value;
    const institution = $("instituicao-cadastro").value.trim();
    let error = null;
    if (name.length < 3 || name.length > 150) error = ["nome-cadastro", "signupNameError"];
    else if (!Auth.isValidEmail(email)) error = ["email-cadastro", "signupEmailError"];
    else if (password.length < 6 || password.length > 128) error = ["senha-cadastro", "signupPasswordError"];
    else if (password !== confirmation) error = ["confirmar-senha-cadastro", "differentPasswords"];
    else if (birth && (birth < "1900-01-01" || birth > [new Date().getFullYear(), String(new Date().getMonth() + 1).padStart(2, "0"), String(new Date().getDate()).padStart(2, "0")].join("-") || Number.isNaN(Date.parse(birth)) || new Date(birth).toISOString().slice(0,10) !== birth)) error = ["nascimento-cadastro", "signupBirthError"];
    else if (phone === null) error = ["telefone-cadastro", "signupPhoneError"];
    else if (institution.length > 200) error = ["instituicao-cadastro", "signupInstitutionError"];
    if (error) return { ok: false, field: error[0], key: error[1], message: authText(error[1]) };
    return { ok: true, email, password, profile: { full_name: name, birth_date: birth || null, phone_e164: phone || null, country_code: country || null, institution_name: institution || null } };
}

async function processarCadastro(event) {
    event.preventDefault();
    limparMensagensCadastro();
    $("formulario-cadastro").querySelectorAll("[aria-invalid]").forEach(el => el.removeAttribute("aria-invalid"));
    const validation = validarCadastro();
    if (!validation.ok) {
        const target = $(validation.field);
        target?.setAttribute("aria-invalid", "true");
        $(validation.field === "confirmar-senha-cadastro" ? "mensagem-confirmar-senha" : "mensagem-cadastro").dataset.authKey = validation.key;
        if (validation.field === "confirmar-senha-cadastro") $("mensagem-confirmar-senha").textContent = validation.message;
        else { $("mensagem-cadastro").textContent = validation.message; $("mensagem-cadastro").dataset.tipo = "erro"; }
        target?.focus();
        return;
    }
    const form = $("formulario-cadastro");
    const controls = Array.from(form.querySelectorAll("input, select, button"));
    controls.forEach(element => element.disabled = true);
    try {
        const resultado = await Auth.signUp(validation.email, validation.password, validation.profile);
        if (resultado.ok) {
            await Auth.logout();
            $("email-acesso").value = Auth.normalizeEmail(validation.email);
            $("senha-acesso").value = "";
            form.reset();
            ddiAlteradoManualmente = false;
            atualizarDdiCadastro("BR");
            mostrarTela(telaAcesso);
            $("mensagem-acesso").textContent = resultado.needsConfirmation ? textoMensagemDeAcesso(resultado.code) : authText("accountCreated");
            $("mensagem-acesso").dataset.tipo = "sucesso";
        } else {
            $("mensagem-cadastro").dataset.backendCode = resultado.code;
        $("mensagem-cadastro").textContent = textoMensagemDeAcesso(resultado.code);
            $("mensagem-cadastro").dataset.tipo = "erro";
        }
    } catch (error) {
        console.error("Falha inesperada no cadastro:", error);
        $("mensagem-cadastro").textContent = textoMensagemDeAcesso("load-error");
        $("mensagem-cadastro").dataset.tipo = "erro";
    } finally {
        controls.forEach(element => element.disabled = false);
    }
}

async function inicializarAplicacaoComAcesso() {
    if (window.SIMUNUS_RECOVERY_REDIRECT) return;
    const resultado = await Auth.initializeSession();
    if (resultado.ok) {
        carregarDadosEstudo();
        await CustomPhases.refreshFromSupabase();
        historicoTelas.length = 0;
        await iniciarFluxoComIdiomaPersistente();
        return;
    }
    historicoTelas.length = 0;
    mostrarTela(telaAcesso, false);
    if (resultado.code === "session-replaced") {
        await redirecionarSessaoSubstituida();
    } else if (resultado.code === "load-error") {
        mostrarMensagemDeAcesso("load-error");
    }
}

// Uma sessão substituída nunca deve continuar no histórico de telas protegidas.
let redirecionamentoSessaoEmAndamento = false;
async function redirecionarSessaoSubstituida() {
    if (redirecionamentoSessaoEmAndamento) return;
    redirecionamentoSessaoEmAndamento = true;
    historicoTelas.length = 0;
    estado.materiaId = null;
    estado.materiaAcademicaAreaId = null;
    estado.simuladosDisponiveis = [];
    estado.catalogoSupabaseCarregado = false;
    limparEstadoDoQuestionario();
    $("senha-acesso").value = "";
    mostrarTela(telaAcesso, false);
    mostrarMensagemDeAcesso("session-replaced");
    try {
        // Encerrar apenas a sessão deste navegador, sem invalidar o dispositivo B.
        await Auth.logout();
    } catch (erro) {
        console.warn("Falha ao limpar a sessão local substituída.", erro);
    } finally {
        historicoTelas.length = 0;
        redirecionamentoSessaoEmAndamento = false;
    }
}
window.addEventListener("simunus:session-replaced", redirecionarSessaoSubstituida);

function limparEstadoDoQuestionario() {
    estado.faseNumero = null;
    estado.customPhaseId = null;
    estado.customSubjectId = null;
    estado.bancoAtual = [];
    estado.perguntas = [];
    estado.perguntaAtual = 0;
    estado.pontos = 0;
    estado.acertos = 0;
    estado.erros = 0;
    estado.carregamentoId++;
}

// Idioma central: escolha manual deste navegador, ou preferências do aparelho.
function normalizarIdiomaInterface(language) {
    return language === "pt-BR" || language === "pt" ? "pt"
        : language === "es" ? "es" : "en";
}

function idiomaInicialDoDispositivo() { return window.SimunusI18n.device(); }

function atualizarIdiomaCentral(language) {
    const previousLanguage = estado.idioma;
    const values = [...document.querySelectorAll('#formulario-acesso input, #formulario-cadastro input, #formulario-cadastro select, #formulario-cadastro textarea')].map(el => [el, el.value]);
    const active = document.activeElement;
    const selection = active && [active.selectionStart, active.selectionEnd];
    aplicarIdiomaInterface(language);
    if ($("mensagem-acesso").dataset.languageCode) mostrarMensagemDeAcesso($("mensagem-acesso").dataset.languageCode);
    if (!$("modal-alterar-senha").hidden) {
        const labels = changePasswordLabels[estado.idioma] || changePasswordLabels.en;
        for (const [id,key] of Object.entries({"senha-modal-titulo":"title","senha-modal-descricao":"description","label-nova-senha":"newPassword","label-confirmar-nova-senha":"confirm","cancelar-alterar-senha":"cancel","salvar-alterar-senha":"save"})) $(id).textContent=labels[key];
        $("fechar-modal-senha").setAttribute("aria-label",labels.close);
    }
    for (const id of ["mensagem-cadastro", "mensagem-confirmar-senha"]) {
        const element = $(id);
        if (element.textContent && element.dataset.authKey) element.textContent = authText(element.dataset.authKey);
        else if (element.textContent && element.dataset.backendCode) element.textContent = textoMensagemDeAcesso(element.dataset.backendCode);
    }
    atualizarConfiguracoes();
    aplicarTema(temaAtual(), false);
    if (!telaMaterias.classList.contains("escondido")) renderizarListaDeMaterias($("campo-pesquisa-materias")?.value || "");
    if (!telaFases.classList.contains("escondido")) renderizarListaDeFases($("campo-pesquisa-fases")?.value || "");
    if (!telaDashboard.classList.contains("escondido")) atualizarDashboard();
    if (!telaSuasFases.classList.contains("escondido")) abrirTelaSuasFases();
    if (!telaListaFasesCustom.classList.contains("escondido")) mostrarListaFasesCustom(customLibraryFilter, false);
    if (!telaJogo.classList.contains("escondido")) {
        atualizarCabecalhoDaFase();
        if (!resultadoFinal.classList.contains("escondido")) finalizar();
        else if (estado.simuladoSupabase) void carregarTentativaSupabase(estado.simuladoSupabase.attemptId, estado.simuladoSupabase.activityInfo).catch(() => {});
        else mostrarPergunta();
    }
    // Translate registered UI labels in open dialogs, never field values or question content.
    document.querySelectorAll('.custom-modal, #modal-alterar-senha, #modal-share-card, #modal-relato-questao').forEach(dialog => {
        dialog.querySelectorAll('h2, label, label span, legend, button, button span, p, option, input[placeholder], textarea[placeholder]').forEach(el => {
            for (const node of el.childNodes) if (node.nodeType === Node.TEXT_NODE) node.textContent = window.SimunusI18n.translateExisting(node.textContent, previousLanguage);
            for (const attr of ['aria-label','title','placeholder']) if (el.hasAttribute(attr)) el.setAttribute(attr, window.SimunusI18n.translateExisting(el.getAttribute(attr), previousLanguage));
        });
    });
    values.forEach(([el,value]) => { el.value = value; });
    if (active?.isConnected) { active.focus({preventScroll:true}); try { active.setSelectionRange(...selection); } catch (_) {} }
}

function aplicarIdiomaInterface(language) {
    estado.idioma = normalizarIdiomaInterface(language);
    atualizarIdiomaDaPagina();
    atualizarTextosDeAcesso();
    atualizarTextosDaSelecao();
}

function mensagemErroIdioma(error) {
    if (/SESSION_REPLACED/i.test(error?.message || "")) {
        void redirecionarSessaoSubstituida();
        return null;
    }
    return estado.idioma === "es" ? "No se pudo guardar o consultar el idioma. Inténtalo de nuevo."
        : estado.idioma === "en" ? "Could not save or load your language. Please try again."
        : "Não foi possível consultar ou salvar o idioma. Tente novamente.";
}

async function iniciarFluxoComIdiomaPersistente() {
    aplicarIdiomaInterface(window.SimunusI18n.current());
    await continuarAposIdioma();
}

async function selecionarIdioma(novoIdioma) {
    window.SimunusI18n.setManual(novoIdioma);
    await continuarAposIdioma();
}

async function apresentarAcessoSemPermissao() {
    // Nunca deduzir expiração a partir de localStorage ou do perfil antigo.
    const status = await window.SimunusApi.getMyAccessStatus();
    if (status === "active") {
        // O catálogo pode ter sido carregado antes da autorização administrativa.
        throw new Error("ACCESS_STATUS_RETRY");
    }
    if (!["new", "expired", "revoked", "pending"].includes(status)) {
        throw new Error("UNKNOWN_ACCESS_STATUS");
    }
    const expired = status === "expired";
    const blocked = status === "revoked" || status === "pending";
    const target = expired ? telaRenovarPlano : telaAcessoPendente;
    atualizarTextosDeAcesso();
    $("titulo-acesso-pendente").textContent = blocked ? authText("blockedTitle") : authText("pendingTitle");
    $("texto-acesso-pendente").textContent = blocked ? authText("blockedText") : authText("pendingText");
    $("botao-whatsapp-suporte").hidden = blocked;
    $("cupom-contato").hidden = blocked;
    $("observacao-acesso-pendente").hidden = blocked;
    $("verificar-acesso").hidden = blocked;
    $("mensagem-verificacao-acesso").textContent = "";
    $("mensagem-verificacao-renovacao").textContent = "";
    historicoTelas.length = 0;
    await mostrarTela(target, false);
}

async function verificarAcessoNovamente(buttonId, messageId) {
    const button = $(buttonId);
    const message = $(messageId);
    if (button.disabled) return;
    button.disabled = true;
    message.textContent = authText("verifying");
    try {
        // Revalida a autorização no servidor sem encerrar a sessão.
        const status = await window.SimunusApi.getMyAccessStatus();
        if (status === "active") {
            estado.catalogoSupabaseCarregado = false;
            estado.catalogoSupabaseErro = null;
            await continuarAposIdioma();
            return;
        }
        if (status === "expired" || status === "new" || status === "revoked" || status === "pending") {
            await apresentarAcessoSemPermissao();
            message.textContent = authText("stillPending");
            return;
        }
        throw new Error("UNKNOWN_ACCESS_STATUS");
    } catch (error) {
        if (mensagemErroIdioma(error) === null) return;
        console.error("Falha ao verificar acesso:", error);
        message.textContent = authText("accessErrorText");
    } finally {
        button.disabled = false;
    }
}

// Cupom opcional: o servidor é a única fonte de validade. Não guarda dados no storage.
const couponContactState = { validCode: null, feedbackKey: null, feedbackKind: "" };
const couponInput = $("codigo-cupom-contato");
const couponCheckButton = $("validar-cupom-contato");
const supportWhatsappButton = $("botao-whatsapp-suporte");
let couponValidationBusy = false;

function setCouponContactFeedback(message, kind = "") {
    const feedback = $("feedback-cupom-contato");
    feedback.textContent = message;
    feedback.dataset.kind = kind;
}

function resetCouponContactValidation() {
    couponContactState.validCode = null;
    couponContactState.feedbackKey = null;
    couponContactState.feedbackKind = "";
    setCouponContactFeedback("");
}

couponInput.addEventListener("input", resetCouponContactValidation);

async function checkCouponForContact() {
    const code = couponInput.value.trim().toUpperCase();
    couponContactState.validCode = null;
    if (!code) {
        resetCouponContactValidation();
        return null;
    }
    if (couponValidationBusy) return null;
    couponValidationBusy = true;
    couponCheckButton.disabled = true;
    setCouponContactFeedback(authText("couponValidating"));
    try {
        const result = await window.SimunusApi.validateCouponForContact(code);
        // O usuário pode alterar o código enquanto a requisição está em andamento.
        if (couponInput.value.trim().toUpperCase() !== code) return null;
        if (result?.valid === true && typeof result.code === "string") {
            couponContactState.validCode = result.code;
            couponContactState.feedbackKey = "couponValid";
            couponContactState.feedbackKind = "success";
            setCouponContactFeedback(authText("couponValid").replace("{code}", result.code), "success");
            return result.code;
        }
        couponContactState.feedbackKey = result?.rate_limited ? "couponLimited" : "couponInvalid";
        couponContactState.feedbackKind = "error";
        setCouponContactFeedback(authText(couponContactState.feedbackKey), "error");
        return null;
    } catch (error) {
        console.error("Erro ao validar cupom para contato:", error);
        couponContactState.feedbackKey = "couponError";
        couponContactState.feedbackKind = "error";
        setCouponContactFeedback(authText("couponError"), "error");
        return null;
    } finally {
        couponValidationBusy = false;
        couponCheckButton.disabled = false;
    }
}

couponCheckButton.addEventListener("click", () => { void checkCouponForContact(); });
couponInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        void checkCouponForContact();
    }
});

supportWhatsappButton.addEventListener("click", async event => {
    // Preserve the public distribution: no private support destination is bundled.
    if (!supportWhatsappButton.getAttribute("href")) { event.preventDefault(); return; }
    // Sem cupom, mantém o fluxo original do link.
    if (!couponInput.value.trim()) return;
    event.preventDefault();
    if (couponValidationBusy) return;
    // Abrir a aba durante o clique evita bloqueadores de pop-up após a RPC async.
    const tab = window.open("about:blank", "_blank");
    supportWhatsappButton.setAttribute("aria-busy", "true");
    try {
        // A validação anterior não é garantia: consultar novamente ao enviar.
        const validatedCode = await checkCouponForContact();
        let message = authText("supportMessage");
        if (validatedCode) {
            message += "\n\n" + authText("couponWhatsapp").replace("{code}", validatedCode);
        }
        const url = new URL(supportWhatsappButton.href);
        url.searchParams.set("text", message);
        if (tab && !tab.closed) {
            tab.location.replace(url);
        } else {
            window.location.assign(url);
        }
    } finally {
        supportWhatsappButton.removeAttribute("aria-busy");
    }
});

$("verificar-acesso").addEventListener("click", () => verificarAcessoNovamente("verificar-acesso", "mensagem-verificacao-acesso"));
$("verificar-renovacao").addEventListener("click", () => verificarAcessoNovamente("verificar-renovacao", "mensagem-verificacao-renovacao"));

async function continuarAposIdioma() {
    estado.materiaId = null;
    limparEstadoDoQuestionario();
    if (usarCatalogoSupabase()) {
        $("pergunta-idioma").textContent = t().carregandoPerguntas;
        try {
            await carregarCatalogoSupabase();
            if (estado.catalogoSupabaseErro) {
                if (estado.catalogoSupabaseErroCodigo === "session-replaced") {
                    await redirecionarSessaoSubstituida();
                    return;
                }
                const semAcesso = estado.catalogoSupabaseErroCodigo === "access-required";
                if (semAcesso) {
                    try {
                        await apresentarAcessoSemPermissao();
                    } catch (error) {
                        console.error("Falha ao classificar situação do plano:", error);
                        $("texto-acesso-pendente").textContent = authText("accessErrorText");
                        $("botao-whatsapp-suporte").hidden = true;
                        $("observacao-acesso-pendente").hidden = true;
                        $("verificar-acesso").hidden = true;
                        await mostrarTela(telaAcessoPendente, false);
                    }
                } else {
                    $("texto-acesso-pendente").textContent = authText("accessErrorText");
                    $("botao-whatsapp-suporte").hidden = true;
                    $("observacao-acesso-pendente").hidden = true;
                    $("verificar-acesso").hidden = true;
                    await mostrarTela(telaAcessoPendente, false);
                }
                return;
            }
        } finally {
            $("pergunta-idioma").textContent = t().idiomaPergunta;
        }
    }
    mostrarTela(telaBoasVindas);
}

function atualizarTextosDaSelecao() {
    $("titulo-idioma").textContent = t().idiomaTitulo;
    $("subtitulo-idioma").textContent = t().idiomaSubtitulo;
    $("pergunta-idioma").textContent = t().idiomaPergunta;
    $("titulo-boas-vindas") && ($("titulo-boas-vindas").textContent = t().boasTitulo);
    $("subtitulo-boas-vindas") && ($("subtitulo-boas-vindas").textContent = t().boasSubtitulo);
    $("botao-materias-boas") && ($("botao-materias-boas").textContent = t().boasBotao);
    $("titulo-materias").textContent = t().materiasTitulo;
    $("subtitulo-materias").textContent = t().materiasSubtitulo;
    $("titulo-fases").textContent = t().fasesTitulo;
    $("subtitulo-fases").textContent = t().fasesSubtitulo;
    $("proxima").textContent = t().proxima;
    $("reiniciar").querySelector("span").textContent = t().novamente.replace(/^🔄\s*/, "");
    $("status-questionario").setAttribute("aria-label", estado.idioma === "es" ? "Estado de la pregunta" : estado.idioma === "en" ? "Question status" : "Status do questionário");
    $("lista-materias").setAttribute("aria-label", estado.idioma === "es" ? "Materias" : estado.idioma === "en" ? "Subjects" : "Matérias");
    $("lista-fases").setAttribute("aria-label", t().fasesTitulo);
    $("abrir-configuracoes").setAttribute("aria-label", t().configuracoes);
    const rotuloPesquisa = estado.idioma === "en" ? "Search" : estado.idioma === "es" ? "Buscar" : "Pesquisar";
    const placeholderPesquisa = estado.idioma === "en" ? "Search..." : estado.idioma === "es" ? "Buscar..." : "Pesquisar...";
    $("abrir-pesquisa-materias")?.setAttribute("aria-label", rotuloPesquisa);
    $("abrir-pesquisa-materias")?.setAttribute("title", rotuloPesquisa);
    $("campo-pesquisa-materias")?.setAttribute("placeholder", placeholderPesquisa);
    $("fechar-pesquisa-materias")?.setAttribute("aria-label", estado.idioma === "en" ? "Close search" : estado.idioma === "es" ? "Cerrar búsqueda" : "Fechar pesquisa");
    $("abrir-pesquisa-fases")?.setAttribute("aria-label", estado.idioma === "en" ? "Search phases" : estado.idioma === "es" ? "Buscar fases" : "Pesquisar fases");
    $("abrir-pesquisa-fases")?.setAttribute("title", rotuloPesquisa);
    $("campo-pesquisa-fases")?.setAttribute("placeholder", placeholderPesquisa);
    $("fechar-pesquisa-fases")?.setAttribute("aria-label", estado.idioma === "en" ? "Close search" : estado.idioma === "es" ? "Cerrar búsqueda" : "Fechar pesquisa");
    $("abrir-configuracoes").title = t().configuracoes;
    $("slider-fonte")?.setAttribute("aria-label", t().tamanhoFonte);
    document.querySelectorAll(".botao-idioma-config").forEach((botao) => {
        botao.setAttribute("aria-pressed", String(botao.dataset.configIdioma === estado.idioma));
    });
    atualizarConfiguracoes();
    atualizarTextosSuasFases();
    atualizarTextosGlobais();
}

function atualizarTextosGlobais() {
    const labels = t().dashboard;
    atualizarTextosCriarSimulado();
    const setText = (id, value) => { const el = $(id); if (el) el.textContent = value; };
    const setAttr = (id, attr, value) => { const el = $(id); if (el) el.setAttribute(attr, value); };

    for (const [id, value] of Object.entries({"titulo-dashboard":labels.title,"titulo-resumo":labels.performance,"titulo-revisao":labels.review,"titulo-evolucao":labels.evolution,"titulo-lista-fases-custom":t().suasFasesTitulo})) setText(id,value);
    if (!estado.perguntas.length) {
        for (const [id,value] of Object.entries({"rotulo-questao":t().rotuloQuestao,"rotulo-pontos":t().rotuloPontos,"rotulo-grupo":t().rotuloGrupo,"tipo-questao":t().tipo,"pergunta":t().carregandoPergunta,"nome-materia-jogo":t().tipo,"subtitulo-jogo":t().carregando})) setText(id,value);
    }
    // Navegação: os botões de voltar são somente o ArrowLeft existente.
    document.querySelectorAll(".navegacao-voltar-superior, .btn-voltar-dashboard, .btn-voltar-fases").forEach((button) => {
        button.setAttribute("aria-label", ui().back);
        button.title = ui().back;
    });

    setText("titulo-resultado", ui().phaseFinished);
    setText("rotulo-pontuacao-final", t().suaPontuacao);
    setText("rotulo-acertos-final", t().acertos);
    setText("rotulo-erros-final", t().erros);
    setText("rotulo-aproveitamento-final", t().aproveitamento);
    const compartilharResultado = $("compartilhar-resultado");
    if (compartilharResultado?.querySelector("span")) compartilharResultado.querySelector("span").textContent = ui().shareResult;
    setText("revisar-erros-sessao", ui().reviewErrors);
    setText("proxima-fase-resultado", ui().nextPhase);
    $("reiniciar")?.querySelector("span") && ($("reiniciar").querySelector("span").textContent = ui().doAgain.replace(/^🔄\s*/, ""));
    setAttr("voltar-fases", "aria-label", ui().back);
    setAttr("voltar-fases", "title", ui().back);

    // Atualizar apenas os rótulos, preservando a estrutura interna dos cartões.
    const reviewWrong = document.querySelector('[data-review-mode="wrong"] .review-card-label');
    const reviewSaved = document.querySelector('[data-review-mode="bookmarked"] .review-card-label');
    const reviewRecent = document.querySelector('[data-review-mode="recent"] .review-card-label');
    if (reviewWrong) reviewWrong.textContent = labels.wrongQuestions;
    if (reviewSaved) reviewSaved.textContent = labels.savedQuestions;
    if (reviewRecent) reviewRecent.textContent = labels.recentQuestions;
    atualizarLayoutRevisao();

    // Compartilhamento textual.
    setText("share-card-title", ui().shareEvolutionTitle);
    setText("share-card-type-label", ui().sharePreviewLabel);
    document.querySelector('[data-share-type="overall"]')?.replaceChildren(document.createTextNode(ui().overall));
    document.querySelector('[data-share-type="subject"]')?.replaceChildren(document.createTextNode(ui().bySubject));
    setText("share-card-native", ui().shareDevice);
    setText("share-card-copy", ui().copyShareText);
    setAttr("fechar-share-card", "aria-label", ui().close);

    // Relato de questões.
    setText("titulo-relato-questao", ui().reportProblem);
    const relatoCabecalho = document.querySelector("#titulo-relato-questao + p"); if (relatoCabecalho) relatoCabecalho.firstChild.textContent = `${ui().reportQuestion} `;
    setText("relato-prompt", ui().reportPrompt);
    setText("enviar-relato", ui().send);
    $("texto-relato-questao")?.setAttribute("placeholder", ui().reportPlaceholder);

    // Pesquisa/fases.
    document.querySelectorAll(".resultado-pesquisa-cabecalho").forEach((el) => el.textContent = ui().searchResults);
    document.querySelectorAll(".resultado-pesquisa-vazio").forEach((el) => el.textContent = ui().noPhases);
}

function idiomaBackend() {
    return estado.idioma === "en" ? "en" : estado.idioma === "es" ? "es" : "pt-BR";
}

/* ============================================================
   CRIAR SIMULADO — ETAPA 3: catálogo e filtros
   ============================================================ */

function textosCriarSimulado() {
    const labels = {
        pt: {
            title: "Criar Simulado", subtitle: "Personalize seu simulado", area: "Área",
            areaPlaceholder: "Selecione uma área", specialty: "Especialidade",
            specialtyPlaceholder: "Selecione uma especialidade", topics: "Temas",
            quantity: "Quantidade de questões", mode: "Modo", immediate: "Feedback imediato",
            exam: "Modo prova", start: "Iniciar Simulado", loading: "Carregando opções...",
            error: "Não foi possível carregar as opções do simulado. Tente novamente.",
            startError: "Não foi possível iniciar o simulado. Tente novamente.",
            starting: "Iniciando simulado...",
            empty: "Nenhum conteúdo disponível para criar simulados no momento."
        },
        en: {
            title: "Create Simulation", subtitle: "Customize your simulation", area: "Area",
            areaPlaceholder: "Select an area", specialty: "Specialty",
            specialtyPlaceholder: "Select a specialty", topics: "Topics",
            quantity: "Number of questions", mode: "Mode", immediate: "Immediate feedback",
            exam: "Exam mode", start: "Start Simulation", loading: "Loading options...",
            error: "Unable to load simulation options. Try again.",
            startError: "Unable to start the simulation. Try again.",
            starting: "Starting simulation...",
            empty: "No content is currently available for custom simulations."
        },
        es: {
            title: "Crear Simulado", subtitle: "Personaliza tu simulado", area: "Área",
            areaPlaceholder: "Selecciona un área", specialty: "Especialidad",
            specialtyPlaceholder: "Selecciona una especialidad", topics: "Temas",
            quantity: "Cantidad de preguntas", mode: "Modo", immediate: "Feedback inmediato",
            exam: "Modo examen", start: "Iniciar Simulado", loading: "Cargando opciones...",
            error: "No fue posible cargar las opciones del simulado. Inténtalo de nuevo.",
            startError: "No fue posible iniciar el simulado. Inténtalo de nuevo.",
            starting: "Iniciando simulado...",
            empty: "No hay contenido disponible para crear simulados en este momento."
        }
    };
    return labels[estado.idioma] || labels.pt;
}

function atualizarTextosCriarSimulado() {
    const l = textosCriarSimulado();
    const setText = (id, value) => { const el = $(id); if (el) el.textContent = value; };
    setText("titulo-criar-simulado", l.title);
    setText("subtitulo-criar-simulado", l.subtitle);
    const form = $("form-criar-simulado");
    if (!form) return;
    const campos = form.querySelectorAll(".campo-simulado-personalizado > label");
    if (campos[0]) campos[0].textContent = l.area;
    if (campos[1]) campos[1].textContent = l.specialty;
    const legends = form.querySelectorAll("legend");
    if (legends[0]) legends[0].textContent = l.topics;
    if (legends[1]) legends[1].textContent = l.quantity;
    if (legends[2]) legends[2].textContent = l.mode;
    const modoLabels = form.querySelectorAll('#criar-simulado-modo label span');
    if (modoLabels[0]) modoLabels[0].textContent = l.immediate;
    if (modoLabels[1]) modoLabels[1].textContent = l.exam;
    setText("iniciar-simulado-personalizado", l.start);
}

function criarOptionSeguro(value, text) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    return option;
}

function resetSelectCriarSimulado(select, placeholder, disabled = false) {
    if (!select) return;
    select.replaceChildren(criarOptionSeguro("", placeholder));
    select.value = "";
    select.disabled = disabled;
}

function catalogoCriarSimuladoValido(data) {
    if (!Array.isArray(data)) return false;
    return data.every((row) => row && typeof row === "object"
        && row.area_id && row.area_name
        && row.specialty_id && row.specialty_name
        && row.topic_id && row.topic_name
        && Number.isFinite(Number(row.published_question_count)));
}

function atualizarEstadoCriarSimulado() {
    const s = estado.criarSimulado;
    const totalDisponivel = (s.catalogo || [])
        .filter((row) => s.topicIds.includes(String(row.topic_id)))
        .reduce((total, row) => total + Math.max(0, Number(row.published_question_count) || 0), 0);

    document.querySelectorAll('input[name="question-count"]').forEach((input) => {
        const valor = Number(input.value);
        input.disabled = !s.topicIds.length || valor > totalDisponivel;
        if (input.disabled && input.checked) input.checked = false;
    });

    const quantidadeMarcada = document.querySelector('input[name="question-count"]:checked');
    s.quantidade = quantidadeMarcada ? Number(quantidadeMarcada.value) : null;

    const modoMarcado = document.querySelector('input[name="simulation-mode"]:checked');
    s.modo = modoMarcado?.value || null;

    const iniciar = $("iniciar-simulado-personalizado");
    if (iniciar) {
        iniciar.disabled = Boolean(
            s.carregando || s.iniciando || s.erro || !s.areaId || !s.especialidadeId
            || !s.topicIds.length || !s.quantidade || !s.modo
        );
    }
}

function renderizarAreasCriarSimulado() {
    const select = $("criar-simulado-area");
    const l = textosCriarSimulado();
    resetSelectCriarSimulado(select, l.areaPlaceholder, false);
    const vistos = new Set();
    (estado.criarSimulado.catalogo || []).forEach((row) => {
        const id = String(row.area_id);
        if (vistos.has(id)) return;
        vistos.add(id);
        select.appendChild(criarOptionSeguro(id, String(row.area_name)));
    });
}

function renderizarEspecialidadesCriarSimulado() {
    const select = $("criar-simulado-especialidade");
    const l = textosCriarSimulado();
    resetSelectCriarSimulado(select, l.specialtyPlaceholder, !estado.criarSimulado.areaId);
    if (!estado.criarSimulado.areaId) return;
    const vistos = new Set();
    (estado.criarSimulado.catalogo || [])
        .filter((row) => String(row.area_id) === estado.criarSimulado.areaId)
        .forEach((row) => {
            const id = String(row.specialty_id);
            if (vistos.has(id)) return;
            vistos.add(id);
            select.appendChild(criarOptionSeguro(id, String(row.specialty_name)));
        });
}

function renderizarTemasCriarSimulado() {
    const container = $("lista-temas-criar-simulado");
    if (!container) return;
    container.replaceChildren();
    if (!estado.criarSimulado.especialidadeId) return;

    (estado.criarSimulado.catalogo || [])
        .filter((row) => String(row.specialty_id) === estado.criarSimulado.especialidadeId)
        .forEach((row) => {
            const id = String(row.topic_id);
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "checkbox";
            input.value = id;
            input.checked = estado.criarSimulado.topicIds.includes(id);
            input.setAttribute("aria-label", String(row.topic_name));

            const nome = document.createElement("span");
            nome.textContent = String(row.topic_name);

            const quantidade = document.createElement("span");
            quantidade.className = "quantidade-tema";
            quantidade.textContent = String(Number(row.published_question_count) || 0);

            label.append(input, nome, quantidade);
            container.appendChild(label);
        });
}

function resetFiltrosCriarSimulado() {
    const s = estado.criarSimulado;
    s.areaId = null;
    s.especialidadeId = null;
    s.topicIds = [];
    s.quantidade = null;
    s.attemptIdCriado = null;
    s.modo = document.querySelector('input[name="simulation-mode"]:checked')?.value || "immediate_feedback";
    resetSelectCriarSimulado($("criar-simulado-area"), textosCriarSimulado().areaPlaceholder, false);
    resetSelectCriarSimulado($("criar-simulado-especialidade"), textosCriarSimulado().specialtyPlaceholder, true);
    $("lista-temas-criar-simulado")?.replaceChildren();
    document.querySelectorAll('input[name="question-count"]').forEach((input) => {
        input.checked = false;
        input.disabled = true;
    });
    atualizarEstadoCriarSimulado();
}

async function abrirCriarSimulado() {
    if (!telaCriarSimulado) return;
    atualizarTextosCriarSimulado();
    resetFiltrosCriarSimulado();
    mostrarTela(telaCriarSimulado);
    const s = estado.criarSimulado;
    const area = $("criar-simulado-area");
    const specialty = $("criar-simulado-especialidade");
    const iniciar = $("iniciar-simulado-personalizado");
    const temas = $("lista-temas-criar-simulado");

    if (Array.isArray(s.catalogo)) {
        if (s.catalogo.length) renderizarAreasCriarSimulado();
        else if (temas) temas.textContent = textosCriarSimulado().empty;
        atualizarEstadoCriarSimulado();
        return;
    }

    if (!window.SimunusApi?.isReady?.() || typeof window.SimunusApi?.getCustomSimulationCatalog !== "function") {
        s.erro = textosCriarSimulado().error;
        if (temas) temas.textContent = s.erro;
        if (area) area.disabled = true;
        if (specialty) specialty.disabled = true;
        if (iniciar) iniciar.disabled = true;
        return;
    }

    s.carregando = true;
    s.erro = null;
    if (area) area.disabled = true;
    if (specialty) specialty.disabled = true;
    if (temas) temas.textContent = textosCriarSimulado().loading;
    atualizarEstadoCriarSimulado();

    try {
        const data = await window.SimunusApi.getCustomSimulationCatalog();
        if (!catalogoCriarSimuladoValido(data)) throw new Error("invalid_custom_simulation_catalog");
        s.catalogo = data;
        s.erro = null;
        if (temas) temas.replaceChildren();
        if (!data.length) {
            if (temas) temas.textContent = textosCriarSimulado().empty;
            if (area) area.disabled = true;
        } else {
            renderizarAreasCriarSimulado();
        }
    } catch (erro) {
        console.error("[Simunus] Falha ao carregar opções do simulado personalizado.", erro);
        s.erro = window.SimunusApi?.friendlyMessage?.(erro, idiomaBackend()) || textosCriarSimulado().error;
        if (temas) temas.textContent = textosCriarSimulado().error;
        if (area) area.disabled = true;
    } finally {
        s.carregando = false;
        atualizarEstadoCriarSimulado();
    }
}

function usarCatalogoSupabase() {
    return Boolean(window.SimunusApi?.isReady?.());
}

async function carregarCatalogoSupabase() {
    if (!usarCatalogoSupabase()) return [];
    try {
        const simulados = await window.SimunusApi.getAvailableSimulations();
        estado.simuladosDisponiveis = Array.isArray(simulados) ? simulados : [];
        estado.catalogoSupabaseCarregado = true;
        estado.catalogoSupabaseErro = null;
        estado.catalogoSupabaseErroCodigo = null;
    } catch (erro) {
        console.error("[Supabase] Falha ao carregar catálogo de simulados.", erro);
        estado.simuladosDisponiveis = [];
        estado.catalogoSupabaseCarregado = false;
        estado.catalogoSupabaseErro = window.SimunusApi?.friendlyMessage?.(erro, idiomaBackend()) || t().erroInesperado;
        estado.catalogoSupabaseErroCodigo = window.SimunusApi?.errorCode?.(erro) || "unknown";
    }
    return estado.simuladosDisponiveis;
}


async function carregarCatalogoAcademico() {
    if (Array.isArray(estado.catalogoAcademico)) {
        return estado.catalogoAcademico;
    }

    try {
        if (
            !window.SimunusApi ||
            !window.SimunusApi.isReady?.() ||
            typeof window.SimunusApi.getCustomSimulationCatalog !== "function"
        ) {
            throw new Error("supabase_unavailable");
        }

        const catalogo =
            await window.SimunusApi.getCustomSimulationCatalog();

        if (!catalogoCriarSimuladoValido(catalogo)) {
            throw new Error("invalid_academic_catalog");
        }

        estado.catalogoAcademico = catalogo;
        estado.catalogoAcademicoErro = null;

        return catalogo;

    } catch (erro) {
        console.error(
            "[Supabase] Falha ao carregar catálogo acadêmico.",
            erro
        );

        estado.catalogoAcademico = null;

        estado.catalogoAcademicoErro =
            erro.message === "supabase_unavailable"
                ? t().erroInesperado
                : (
                    window.SimunusApi?.friendlyMessage?.(
                        erro,
                        idiomaBackend()
                    ) || t().erroInesperado
                );

        return [];
    }
}


async function mostrarMaterias(registrarHistorico = true) {
    mostrarTela(telaMaterias, registrarHistorico);
    listaMaterias.replaceChildren();
    estado.materiaAcademicaAreaId = null;
    const campoPesquisa = $("campo-pesquisa-materias");
    if (campoPesquisa) campoPesquisa.value = "";
    fecharPesquisaMaterias(false);

    const mensagem = $("mensagem-materias");

if (mensagem) {
    mensagem.textContent = t().carregandoPerguntas;
}

try {
    await carregarDashboardEstudo();
} catch (erro) {
    console.warn(
        "[Dashboard] Não foi possível carregar o desempenho dos cards.",
        erro
    );
    estado.dashboardEstudo = null;
}

await carregarCatalogoAcademico();

renderizarListaDeMaterias("");
}

function areasAcademicasDoCatalogo() {
    const mapa = new Map();
    (estado.catalogoAcademico || []).forEach((row, indice) => {
        const id = String(row.area_id);
        if (mapa.has(id)) return;
        mapa.set(id, {
            id,
            nome: String(row.area_name || ""),
            sortOrder: Number(row.area_sort_order) || 0,
            indice
        });
    });
    return [...mapa.values()].sort((a, b) =>
        a.sortOrder - b.sortOrder || a.indice - b.indice
    );
}

function renderizarListaDeMaterias(filtro = "") {
    listaMaterias.replaceChildren();
    const mensagem = $("mensagem-materias");
    if (mensagem) mensagem.textContent = "";
    const termo = normalizarBusca(filtro);

    {
        if (estado.catalogoAcademicoErro) {
            if (mensagem) mensagem.textContent = estado.catalogoAcademicoErro;
            return;
        }

        const areas = areasAcademicasDoCatalogo().filter((area) =>
            !termo || normalizarBusca(area.nome).includes(termo)
        );

        if (!areas.length) {
            if (mensagem) {
                mensagem.textContent = estado.idioma === "en"
                    ? "No subjects found."
                    : estado.idioma === "es"
                        ? "No se encontraron materias."
                        : "Nenhuma matéria encontrada.";
            }
            return;
        }

        areas.forEach((area) => {
            const stats = estatisticaAreaDashboard(area.id);
            const desempenho = normalizarPercentualVisual(stats?.accuracy_percentage);
            const desempenhoTexto = Number.isInteger(desempenho) ? String(desempenho) : desempenho.toFixed(2);

            const botao = document.createElement("button");
            botao.type = "button";
            botao.className = "botao-selecao botao-materia card-com-progresso";
            botao.style.setProperty("--progress-width", `${desempenho}%`);

            const camada = document.createElement("span");
            camada.className = "camada-progresso";
            camada.setAttribute("aria-hidden", "true");

            const conteudo = document.createElement("span");
            conteudo.className = "card-progresso-conteudo";
            const titulo = document.createElement("span");
            titulo.className = "card-materia-titulo";
            titulo.textContent = area.nome;
            const meta = document.createElement("span");
            meta.className = "card-progresso-meta";
            const valor = document.createElement("strong");
            valor.textContent = `${desempenhoTexto}%`;
            meta.appendChild(valor);
            conteudo.append(titulo, meta);
            botao.append(camada, conteudo);
            botao.addEventListener("click", () => abrirMateriaAcademica(area.id));
            listaMaterias.appendChild(botao);
        });
        return;
    }
}

/* Mantido para os simulados oficiais; eles continuam disponíveis na arquitetura. */
function renderizarCatalogoSupabase(termo = "") {
    const mensagem = $("mensagem-materias");
    const simulados = estado.simuladosDisponiveis.filter((simulado) => {
        if (!termo) return true;
        return normalizarBusca([
            simulado.title,
            simulado.description,
            simulado.simulation_type,
            simulado.code
        ].filter(Boolean).join(" ")).includes(termo);
    });
    if (estado.catalogoSupabaseErro) {
        if (mensagem) mensagem.textContent = estado.catalogoSupabaseErro;
        return;
    }
    if (!simulados.length) {
        if (mensagem) mensagem.textContent = estado.idioma === "en" ? "No simulations found." : estado.idioma === "es" ? "No se encontraron simulados." : "Nenhum simulado encontrado.";
        return;
    }
    if (mensagem) mensagem.textContent = "";
    simulados.forEach((simulado) => adicionarCardSimuladoSupabase(simulado));
}

function adicionarCardSimuladoSupabase(simulado) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao-selecao botao-materia";
    const partes = [
        simulado.simulation_type,
        simulado.total_questions ? `${simulado.total_questions} ${estado.idioma === "en" ? "questions" : estado.idioma === "es" ? "preguntas" : "questões"}` : "",
        simulado.time_limit_minutes ? `${simulado.time_limit_minutes} min` : ""
    ].filter(Boolean);
    botao.innerHTML = `
        <span class="botao-icone" aria-hidden="true">🩺</span>
        <span>
            <strong>${escaparHTML(simulado.title || simulado.code || "Simulado")}</strong>
            ${simulado.description ? `<small>${escaparHTML(simulado.description)}</small>` : ""}
            ${partes.length ? `<small>${escaparHTML(partes.join(" · "))}</small>` : ""}
        </span>
    `;
    botao.addEventListener("click", () => prepararSimuladoSupabase(simulado));
    listaMaterias.appendChild(botao);
}

// A última atividade é obtida do Supabase, nunca do armazenamento do navegador.
async function lerAtividadeSupabase() {
    const api = window.SimunusApi;
    if (!api?.isReady?.()) return null;
    const result = await api.getMyLastActivity();
    const row = Array.isArray(result) ? result[0] : result;
    if (!row?.attempt_id) return null;
    const isAcademic = Boolean(row.topic_id);
    const info = {
        attemptId: row.attempt_id,
        source: isAcademic ? "academic_phase" : (row.source_type === "official" ? "official" : "custom"),
        simulationId: row.simulation_id || null,
        areaId: row.area_id || null,
        specialtyId: row.specialty_id || null,
        topicId: row.topic_id || null,
        phaseNumber: Number(row.topic_sort_order) || 1,
        completed: row.attempt_status !== "in_progress",
        nextIndex: Number(row.answered_questions) || 0,
        totalQuestions: Number(row.total_questions) || 0,
        mode: "immediate_feedback",
        title: "Simulado",
        description: ""
    };
    if (isAcademic) {
        const catalog = await carregarCatalogoAcademico();
        const topic = catalog.find(item => String(item.topic_id) === String(row.topic_id));
        info.title = topic?.area_name || "Matéria";
        info.description = topic?.topic_name || "Fase acadêmica";
    } else if (row.simulation_id) {
        const sims = estado.simuladosDisponiveis || [];
        const sim = sims.find(item => String(item.simulation_id) === String(row.simulation_id));
        info.title = sim?.title || sim?.code || "Simulado";
        info.description = sim?.description || "";
    }
    return info;
}

// Os dados do progresso e da conclusão são persistidos pelas RPCs de respostas
// e finalização. Não manter ponteiros locais que possam divergir do Supabase.
async function gravarAtividadeSupabase(_info) {}

function proximaFaseAcademica(info) {
    const rows = (estado.catalogoAcademico || []).filter(row =>
        String(row.area_id) === String(info.areaId) && Number(row.published_question_count) > 0);
    rows.sort((a, b) => (Number(a.specialty_sort_order) || 0) - (Number(b.specialty_sort_order) || 0)
        || (Number(a.topic_sort_order) || 0) - (Number(b.topic_sort_order) || 0));
    const index = rows.findIndex(row => String(row.topic_id) === String(info.topicId));
    return index >= 0 ? rows[index + 1] || null : null;
}
async function atualizarContinuarSupabase(hasAnsweredQuestions = false) {
    const button = $("botao-continuar");
    const cardContinuar = button?.closest(".dashboard-continue");
    if (!button || !cardContinuar) return;
    const labels = t().dashboard;

    // Limpar o estado anterior em toda atualização, inclusive erros na RPC.
    button.hidden = true;
    button.dataset.continue = "";
    $("titulo-continuar").textContent = labels.startTitle;
    $("descricao-continuar").textContent = labels.startDescription;

    if (!hasAnsweredQuestions) return;

    let info;
    try { info = await lerAtividadeSupabase(); }
    catch (error) {
        console.warn("[Continuar] Falha ao consultar última atividade.", error);
        button.hidden = true;
        return;
    }
    if (!info?.attemptId) return;
    button.hidden = false;
    $("titulo-continuar").textContent = info.title || labels.resume;
    $("descricao-continuar").textContent = info.completed
        ? `${info.description || ""} · ${labels.resume}`
        : `${info.description || ""} · ${labels.continueQuestion} ${Number(info.nextIndex || 0) + 1}`;
    button.querySelector("span").textContent = labels.resume;
    button.dataset.continue = "supabase";
}
async function continuarAtividadeSupabase() {
    const info = await lerAtividadeSupabase();
    if (!info?.attemptId) return;
    const button = $("botao-continuar");
    button.disabled = true;
    try {
        if (info.completed && info.source === "academic_phase") {
            await carregarCatalogoAcademico();
            const next = proximaFaseAcademica(info);
            if (next) {
                abrirMateriaAcademica(info.areaId);
                await iniciarFaseAcademica(next, null);
            } else {
                abrirMateriaAcademica(info.areaId);
            }
            return;
        }
        if (info.completed) {
            await mostrarMaterias();
            return;
        }
        await carregarTentativaSupabase(info.attemptId, info);
    } catch (erro) {
        console.error("[Continuar] Falha ao recuperar atividade.", erro);
        $("descricao-continuar").textContent =
            window.SimunusApi?.friendlyMessage?.(erro, idiomaBackend()) || t().erroInesperado;
    } finally { button.disabled = false; }
}

async function carregarTentativaSupabase(attemptId, contexto = {}) {
    if (!attemptId) throw new Error("Attempt ID ausente.");

    const content = await window.SimunusContentLanguage.attempt(window.SimunusApi, attemptId, idiomaBackend());
    if (content.requestedLanguage !== idiomaBackend()) return carregarTentativaSupabase(attemptId, contexto);
    const idioma = content.language;
    const questoesComAlternativas = content.questions;

    estado.simuladoSupabase = {
        contentLanguage: idioma,
        simulationId: contexto.simulationId ?? null,
        attemptId,
        mode: contexto.mode || "immediate_feedback",
        title: contexto.title || "Simulado",
        description: contexto.description || "",
        code: contexto.code || "",
        source: contexto.source || "official",
        activityInfo: { ...contexto }
    };
    estado.resultadoSupabase = null;
    estado.perguntas = questoesComAlternativas;
    estado.bancoAtual = questoesComAlternativas;
    const pendente = questoesComAlternativas.findIndex(q => !q.answered);
    estado.perguntaAtual = pendente >= 0 ? pendente : questoesComAlternativas.length - 1;
    estado.pontos = 0;
    estado.acertos = 0;
    estado.erros = 0;
    // Não inferir acertos pelas alternativas: o gabarito só é liberado após resposta.
    if (estado.simuladoSupabase.mode !== "exam") {
        const respostasSalvas = questoesComAlternativas.filter(q => q.answered);
        const feedbacks = await Promise.all(respostasSalvas.map(q =>
            window.SimunusApi.getAttemptQuestionFeedback(q.attempt_question_id, idioma)
        ));
        feedbacks.forEach((retorno, i) => {
            const q = respostasSalvas[i];
            const dados = Array.isArray(retorno) ? retorno[0] : retorno;
            q.feedbackSupabase = dados || null;
            if (dados?.is_correct === true) estado.acertos++;
            else if (dados?.is_correct === false) estado.erros++;
        });
    }
    estado.pontos = estado.acertos * 10;
    const atividade = { ...contexto, attemptId, nextIndex: Math.max(0, pendente),
        completed: false };
    // Registra também simulados oficiais/personalizados como última atividade.
    // Para fases acadêmicas o vínculo e o ponteiro já são gravados na RPC de início.
    if (contexto.source !== "academic_phase" && contexto.source !== "review") {
        await window.SimunusApi.recordMyAttemptActivity(attemptId);
    }

    const inicioRetomado = contexto.startedAt
        ? new Date(contexto.startedAt).getTime()
        : NaN;

    sessaoEstudo = {
        respostas: [],
        inicio: Number.isFinite(inicioRetomado) ? inicioRetomado : Date.now(),
        modo: contexto.source === "review" ? "review" : "normal",
        refs: [],
        resumeIndex: null,
        completionRecorded: false
    };

    estado.modoRevisao = contexto.source === "review";
    $("titulo-jogo").dataset.review = String(estado.modoRevisao);
    $("nome-materia-jogo").textContent = estado.simuladoSupabase.title;
    $("subtitulo-jogo").textContent = estado.simuladoSupabase.description;

    await mostrarTela(telaJogo);
    card.classList.remove("escondido");
    resultadoFinal.classList.add("escondido");
    mostrarPerguntaSupabase();
    if (pendente < 0) {
        // Todas as respostas foram persistidas, mas a tentativa ainda não foi finalizada.
        $("proxima").disabled = false;
    }
}

async function prepararSimuladoSupabase(simulado) {
    const mensagem = $("mensagem-materias");
    if (mensagem) mensagem.textContent = t().carregandoPerguntas;

    try {
        const tentativa = await window.SimunusApi.getInProgressAttempt(simulado.simulation_id);
        const tentativaExistente = Array.isArray(tentativa) ? tentativa[0] : tentativa;
        let attemptId = tentativaExistente?.attempt_id || null;

        if (!attemptId) {
            attemptId = await window.SimunusApi.startSimulationAttempt(
                simulado.simulation_id,
                "immediate_feedback"
            );
        }
        if (!attemptId) throw new Error("Attempt could not be created.");

        await carregarTentativaSupabase(attemptId, {
            source: "official",
            simulationId: simulado.simulation_id,
            mode: "immediate_feedback",
            title: simulado.title || simulado.code || "Simulado",
            description: simulado.description || "",
            code: simulado.code || "",
            startedAt: tentativaExistente?.started_at || null
        });
    } catch (erro) {
        console.error("[Supabase] Falha ao preparar simulado.", erro);
        if (mensagem) {
            mensagem.textContent =
                window.SimunusApi?.friendlyMessage?.(erro, idiomaBackend()) || t().erroInesperado;
        }
    }
}

function mostrarPerguntaSupabase() {
    window.SimunusContentLanguage.notice(estado.simuladoSupabase?.contentLanguage || idiomaBackend());
    const atual = estado.perguntas[estado.perguntaAtual];

    if (!atual) {
        return;
    }

    // Número da questão.
    $("numero-questao").textContent =
        `${estado.perguntaAtual + 1}/${estado.perguntas.length}`;

    $("pontuacao").textContent = estado.pontos;

    $("rotulo-questao").textContent = t().rotuloQuestao;
    $("rotulo-pontos").textContent = t().rotuloPontos;

    // O Supabase ainda não fornece aqui o código público C01 etc.
    // Usamos a posição da questão temporariamente.
    $("tipo-questao").textContent =
        String(atual.question_position ?? estado.perguntaAtual + 1);

    // O agrupamento do banco legado não se aplica ao simulado Supabase.
    $("status-grupo").hidden = true;
    $("status-questionario").classList.add("status-sem-grupo");

    // Nesta etapa ainda não carregamos mídia pelo backend.
    const imagemQuestao = $("imagem-questao");
    imagemQuestao.innerHTML = "";
    imagemQuestao.hidden = true;
    imagemQuestao.setAttribute("aria-hidden", "true");

    // Enunciado vindo diretamente do Supabase.
    $("pergunta").textContent = atual.prompt || "";

    // Limpa o estado visual anterior.
    $("alternativas").setAttribute(
        "aria-label",
        t().alternativas
    );

    $("alternativas").innerHTML = "";

    $("feedback").innerHTML = "";
    $("feedback").className = "feedback vazio";

    $("proxima").disabled = true;

    // Alternativas já retornadas pelo backend na ordem congelada da tentativa.
    const alternativas = Array.isArray(atual.alternativasSupabase)
        ? atual.alternativasSupabase
        : [];

    const respostaExistente = atual.answered === true;
    $("marcar-questao").hidden = false;
    atualizarBotaoMarcacao(); // Favoritos oficiais consultados pelo Supabase.
    const feedbackAnterior = atual.feedbackSupabase;
    if (respostaExistente && feedbackAnterior) {
        const acertou = feedbackAnterior.is_correct === true;
        $("feedback").className = `feedback ${acertou ? "certo" : "errado"}`;
        $("feedback").textContent = `${acertou ? t().correto : t().incorreto} ${feedbackAnterior.explanation || ""}`;
        $("proxima").disabled = false;
    }

    alternativas
        .sort(
            (a, b) =>
                Number(a.display_position) -
                Number(b.display_position)
        )
        .forEach((alternativa) => {
            const botao = document.createElement("button");

            botao.type = "button";
            botao.className = "alternativa";

            botao.dataset.optionId = alternativa.option_id;

            botao.textContent = alternativa.option_text || "";
            if (respostaExistente) {
                botao.disabled = true;
                if (alternativa.option_id === atual.selected_option_id) {
                    botao.classList.add(feedbackAnterior?.is_correct === true ? "correta" : "errada");
                }
                if (feedbackAnterior?.correct_option_id === alternativa.option_id) botao.classList.add("correta");
            }

            // Temporário:
            // nesta etapa apenas confirmamos a renderização.
            if (!respostaExistente) botao.addEventListener("click", () => {
                responderSupabase(botao, alternativa, atual);
            });

            $("alternativas").appendChild(botao);
        });
}

async function responderSupabase(botaoClicado, alternativa, pergunta) {
    const botoes = document.querySelectorAll(".alternativa");
    const feedback = $("feedback");

    // Impede resposta dupla enquanto o backend processa.
    botoes.forEach((botao) => {
        botao.disabled = true;
    });

    try {
        // 1. Envia a resposta ao Supabase.
        await window.SimunusApi.submitAttemptAnswer(
            pergunta.attempt_question_id,
            alternativa.option_id,
            null
        );

        // Em modo prova, a resposta é registrada sem solicitar gabarito,
        // correção ou explicação antes da finalização.
        if (estado.simuladoSupabase?.mode === "exam") {
            botaoClicado.classList.add("selecionada");
            $("proxima").disabled = false;
            return;
        }

        // 2. Feedback imediato: só aqui buscamos correção e explicação.
        const retorno = await window.SimunusApi.getAttemptQuestionFeedback(
            pergunta.attempt_question_id,
            estado.simuladoSupabase?.contentLanguage || idiomaBackend()
        );

        const dados = Array.isArray(retorno)
            ? retorno[0]
            : retorno;

        if (!dados) {
            throw new Error("No feedback returned.");
        }

        const acertou = dados.is_correct === true;
        pergunta.answered = true;
        pergunta.selected_option_id = alternativa.option_id;
        pergunta.feedbackSupabase = dados;
        await gravarAtividadeSupabase({ ...estado.simuladoSupabase,
            ...estado.simuladoSupabase?.activityInfo, attemptId: estado.simuladoSupabase.attemptId,
            nextIndex: Math.min(estado.perguntaAtual + 1, estado.perguntas.length - 1), completed: false });

        // 3. Marca visualmente a alternativa correta/incorreta.
        if (acertou) {
            botaoClicado.classList.add("correta");

            estado.pontos += 10;
            estado.acertos++;

            feedback.className = "feedback certo";
            feedback.innerHTML = `
                <strong>${escaparHTML(t().correto)}</strong>
                <br><br>
                ${escaparHTML(dados.explanation || "")}
            `;
        } else {
            botaoClicado.classList.add("errada");
            estado.erros++;

            // O ID correto só chega depois da resposta.
            botoes.forEach((botao) => {
                if (botao.dataset.optionId === dados.correct_option_id) {
                    botao.classList.add("correta");
                }
            });

            feedback.className = "feedback errado";
            feedback.innerHTML = `
                <strong>${escaparHTML(t().incorreto)}</strong>
                <br><br>
                ${escaparHTML(dados.explanation || "")}
            `;
        }

        // 4. Atualiza pontuação visual.
        $("pontuacao").textContent = estado.pontos;

        // 5. Libera a próxima questão.
        $("proxima").disabled = false;

        rolarSuavementeAteFeedback(feedback);

    } catch (erro) {
        console.error(
            "[Supabase] Falha ao responder questão.",
            erro
        );

        // A resposta pode ter sido gravada antes da falha de rede no feedback.
        try {
            const rows = await window.SimunusApi.getSimulationAttempt(estado.simuladoSupabase.attemptId, idiomaBackend());
            const saved = rows.find(q => q.attempt_question_id === pergunta.attempt_question_id);
            if (saved?.answered) {
                await carregarTentativaSupabase(estado.simuladoSupabase.attemptId,
                    estado.simuladoSupabase.activityInfo || estado.simuladoSupabase);
                return;
            }
        } catch (recuperacaoErro) { console.warn("[Supabase] Falha na reconciliação da resposta.", recuperacaoErro); }
        botoes.forEach((botao) => { botao.disabled = false; });

        feedback.className = "feedback errado";
        feedback.textContent =
            window.SimunusApi?.friendlyMessage?.(
                erro,
                idiomaBackend()
            ) || t().erroInesperado;
    }
}

async function finalizarSimuladoSupabase() {
    const dadosSimulado = estado.simuladoSupabase;

    if (!dadosSimulado?.attemptId) {
        console.error("[Supabase] Attempt ID ausente.");
        return;
    }

    try {
        $("proxima").disabled = true;

        await window.SimunusApi.finishSimulationAttempt(
            dadosSimulado.attemptId
        );

        const retorno = await window.SimunusApi.getAttemptResult(
            dadosSimulado.attemptId
        );

        const resultado = Array.isArray(retorno)
            ? retorno[0]
            : retorno;

        if (!resultado) {
            throw new Error("No result returned.");
        }

        estado.acertos = Number(resultado.correct_answers) || 0;
        estado.erros = Number(resultado.incorrect_answers) || 0;
        estado.pontos = estado.acertos * 10;

        // O status da tentativa foi atualizado no Supabase. O ponteiro de
        // última atividade permanece vinculado à tentativa finalizada.
        estado.resultadoSupabase = {
            ...resultado,
            attemptId: dadosSimulado.attemptId
        };

        finalizarSupabase();

    } catch (erro) {
        console.error(
            "[Supabase] Falha ao finalizar simulado.",
            erro
        );

        $("proxima").disabled = false;

        const feedback = $("feedback");

        if (feedback) {
            feedback.className = "feedback errado";
            feedback.textContent =
                window.SimunusApi?.friendlyMessage?.(
                    erro,
                    idiomaBackend()
                ) || t().erroInesperado;
        }
    }
}

function iniciarMateriaPersonalizada(id) {
    const materiaCustom = CustomPhases.getSubjectById(id);
    if (!materiaCustom || !Array.isArray(materiaCustom.questions) || !materiaCustom.questions.length) {
        return;
    }

    estado.materiaId = null;
    estado.mediaBase = "";
    estado.customSubjectId = materiaCustom.id;
    estado.customPhaseId = materiaCustom.id; // compatibilidade com o motor já existente.
    estado.faseNumero = null;
    estado.carregamentoId++;
    estado.bancoAtual = materiaCustom.questions.map((q) => ({
        ...q,
        incompativeis: Array.isArray(q.incompativeis) ? q.incompativeis : [],
        incompativeisPT: Array.isArray(q.incompativeisPT) ? q.incompativeisPT : []
    }));

    // O cabeçalho final precisa estar pronto antes da captura do estado
    // destino da shared-element transition.
    atualizarCabecalhoDaFase();
    mostrarTela(telaJogo);
    iniciarQuestionario();
}

function adicionarCardMateriaPersonalizada(materiaCustom) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao-selecao botao-materia materia-personalizada card-com-progresso";
    const records = Object.values(dadosEstudo.questions).filter((record) => record?.ref?.customSubjectId === materiaCustom.id);
    const total = materiaCustom.questions.length;
    const progress = total ? Math.min(100, Math.round(records.length / total * 100)) : 0;
    const attempts = records.reduce((sum, record) => sum + (Number(record.attempts) || 1), 0);
    const correctAttempts = records.reduce((sum, record) => sum + (Number(record.correctAttempts) || (record.correct ? 1 : 0)), 0);
    const performance = attempts ? Math.round(correctAttempts / attempts * 100) : 0;
    botao.style.setProperty("--progress-width", `${progress}%`);
    botao.innerHTML = `<span class="camada-progresso" aria-hidden="true"></span><span class="card-progresso-conteudo materia-personalizada-conteudo"><span class="card-materia-titulo">${escaparHTML(materiaCustom.name)} <small class="selo-personalizada">${escaparHTML(t().personalizadas)}</small></span><span class="card-progresso-meta"><strong>${progress}%</strong></span></span>`;
    botao.addEventListener("click", () => iniciarMateriaPersonalizada(materiaCustom.id));
    listaMaterias.appendChild(botao);
}

function normalizarBusca(valor) {
    return String(valor ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase()
        .trim();
}

function linhasDaMateriaAcademica() {
    const areaId = estado.materiaAcademicaAreaId;
    return (estado.catalogoAcademico || []).filter((row) => String(row.area_id) === areaId);
}

function abrirMateriaAcademica(areaId, registrarHistorico = true) {
    const area = areasAcademicasDoCatalogo().find((item) => item.id === String(areaId));
    if (!area) return;
    estado.materiaAcademicaAreaId = area.id;
    estado.materiaId = null;
    estado.customSubjectId = null;
    estado.faseAcademica = { iniciando: false, chave: null, attemptIdCriado: null };
    mostrarTela(telaFases, registrarHistorico);
    $("titulo-fases").textContent = area.nome;
    $("subtitulo-fases").textContent = t().fasesSubtitulo;
    const campo = $("campo-pesquisa-fases");
    if (campo) campo.value = "";
    fecharPesquisaFases(false);
    renderizarListaDeFases("");
}

function textosFaseAcademica() {
    if (estado.idioma === "en") return { phase: "Phase", questions: "questions", question: "question", loading: "Loading questions..." };
    if (estado.idioma === "es") return { phase: "Fase", questions: "preguntas", question: "pregunta", loading: "Cargando preguntas..." };
    return { phase: "Fase", questions: "questões", question: "questão", loading: "Carregando perguntas..." };
}

function renderizarFasesAcademicas(filtro = "") {
    listaFases.replaceChildren();
    mensagemFases.textContent = "";
    const termo = normalizarBusca(filtro);
    const linhas = linhasDaMateriaAcademica();
    const especialidades = new Map();

    linhas.forEach((row, indice) => {
        const id = String(row.specialty_id);
        if (!especialidades.has(id)) {
            especialidades.set(id, {
                id,
                nome: String(row.specialty_name || ""),
                sortOrder: Number(row.specialty_sort_order) || 0,
                indice,
                temas: []
            });
        }
        especialidades.get(id).temas.push({ row, indice });
    });

    const grupos = [...especialidades.values()].sort((a, b) =>
        a.sortOrder - b.sortOrder || a.indice - b.indice
    );
    let exibidos = 0;
    const l = textosFaseAcademica();

    grupos.forEach((grupo) => {
        const temas = grupo.temas
            .sort((a, b) =>
                (Number(a.row.topic_sort_order) || 0) - (Number(b.row.topic_sort_order) || 0)
                || a.indice - b.indice
            )
            .filter(({ row }) => !termo || normalizarBusca(`${grupo.nome} ${row.topic_name}`).includes(termo));

        if (!temas.length) return;

        const cabecalho = document.createElement("div");
        cabecalho.className = "resultado-pesquisa-cabecalho especialidade-academica";
        cabecalho.textContent = grupo.nome;
        listaFases.appendChild(cabecalho);

        temas.forEach(({ row }, posicao) => {
            const quantidade = Math.max(0, Number(row.published_question_count) || 0);
            const stats = estatisticaTopicoDashboard(row.topic_id);
            const desempenho = normalizarPercentualVisual(stats?.accuracy_percentage);
            const desempenhoTexto = Number.isInteger(desempenho) ? String(desempenho) : desempenho.toFixed(2);

            const botao = document.createElement("button");
            botao.type = "button";
            botao.className = "botao-selecao botao-fase card-com-progresso card-fase-progresso";
            botao.style.setProperty("--progress-width", `${desempenho}%`);
            botao.disabled = quantidade <= 0;

            const camada = document.createElement("span");
            camada.className = "camada-progresso";
            camada.setAttribute("aria-hidden", "true");

            const conteudo = document.createElement("span");
            conteudo.className = "card-progresso-conteudo";

            const numero = document.createElement("span");
            numero.className = "fase-numero";
            numero.textContent = `${l.phase} ${Number(row.topic_sort_order) || posicao + 1}`;

            const tema = document.createElement("span");
            tema.className = "fase-tema";
            tema.textContent = String(row.topic_name || "");

            const percentual = document.createElement("span");
            percentual.className = "card-progresso-meta";
            const valor = document.createElement("strong");
            valor.textContent = `${desempenhoTexto}%`;
            percentual.appendChild(valor);

            const meta = document.createElement("span");
            meta.className = "card-progresso-desempenho";
            meta.textContent = `${quantidade} ${quantidade === 1 ? l.question : l.questions}`;

            conteudo.append(numero, tema, percentual, meta);
            botao.append(camada, conteudo);
            if (quantidade > 0) {
                botao.addEventListener("click", () => iniciarFaseAcademica(row, botao));
            }
            listaFases.appendChild(botao);
            exibidos++;
        });
    });

    if (!exibidos) {
        const vazio = document.createElement("div");
        vazio.className = "resultado-pesquisa-vazio";
        vazio.textContent = ui().noPhases;
        listaFases.appendChild(vazio);
    }
}

async function iniciarFaseAcademica(row, botao) {
    const fluxo = estado.faseAcademica;
    const chave = `${row.area_id}:${row.specialty_id}:${row.topic_id}`;
    if (fluxo.iniciando) return;

    // Se houve falha depois da criação desta mesma fase, reutiliza o attempt_id.
    if (fluxo.chave !== chave) {
        fluxo.chave = chave;
        fluxo.attemptIdCriado = null;
    }

    fluxo.iniciando = true;
    const botoes = listaFases.querySelectorAll("button");
    botoes.forEach((item) => { item.disabled = true; });
    const textoAnterior = botao?.textContent || "";
    const l = textosFaseAcademica();
    if (botao) botao.textContent = l.loading;
    mensagemFases.textContent = "";

    try {
        // A RPC serializa criação/retomada por usuário e tópico.
        // Não reutilizar ponteiros locais: podem estar desatualizados.
        const attemptId = await window.SimunusApi.startOrResumeAcademicPhase(
            String(row.topic_id)
        );
        if (typeof attemptId !== "string" || !attemptId.trim()) {
            throw new Error("Attempt could not be created.");
        }

        await carregarTentativaSupabase(attemptId, {
            source: "academic_phase",
            simulationId: null,
            mode: "immediate_feedback",
            title: String(row.area_name || ""),
            description: String(row.topic_name || ""),
            code: "",
            areaId: String(row.area_id), specialtyId: String(row.specialty_id),
            topicId: String(row.topic_id), phaseNumber: Number(row.topic_sort_order) || 1
        });
    } catch (erro) {
        console.error("[Supabase] Falha ao iniciar fase acadêmica.", erro);
        mensagemFases.textContent =
            window.SimunusApi?.friendlyMessage?.(erro, idiomaBackend()) || t().erroInesperado;
        if (botao) botao.textContent = textoAnterior;
        botoes.forEach((item) => { item.disabled = false; });
    } finally {
        fluxo.iniciando = false;
    }
}

function renderizarListaDeFases(filtro = "") {
    listaFases.replaceChildren();
    mensagemFases.textContent = "";

    if (!estado.materiaAcademicaAreaId) {
        console.error(
            "[Supabase] Nenhuma matéria acadêmica selecionada."
        );

        mensagemFases.textContent = t().erroInesperado;
        return;
    }

    renderizarFasesAcademicas(filtro);
}

let temporizadorFechamentoPesquisaMaterias = null;

function fecharPesquisaMaterias(limpar = true) {
    const painel = $("pesquisa-materias");
    const botao = $("abrir-pesquisa-materias");
    if (!painel || !botao) return;

    if (temporizadorFechamentoPesquisaMaterias) {
        clearTimeout(temporizadorFechamentoPesquisaMaterias);
        temporizadorFechamentoPesquisaMaterias = null;
    }

    const estavaAberto = !painel.hidden && painel.classList.contains("is-open");
    botao.hidden = false;
    botao.setAttribute("aria-expanded", "false");
    painel.setAttribute("aria-hidden", "true");
    painel.classList.remove("is-open");

    if (limpar) {
        const campo = $("campo-pesquisa-materias");
        if (campo) campo.value = "";
        renderizarListaDeMaterias("");
    }

    if (!estavaAberto) {
        painel.hidden = true;
        botao.focus({ preventScroll: true });
        return;
    }

    temporizadorFechamentoPesquisaMaterias = setTimeout(() => {
        painel.hidden = true;
        painel.classList.remove("is-open");
        painel.setAttribute("aria-hidden", "true");
        temporizadorFechamentoPesquisaMaterias = null;
        botao.focus({ preventScroll: true });
    }, 260);
}

async function abrirPesquisaMaterias() {
    const painel = $("pesquisa-materias");
    const botao = $("abrir-pesquisa-materias");
    const campo = $("campo-pesquisa-materias");
    if (!painel || !botao) return;

    if (temporizadorFechamentoPesquisaMaterias) {
        clearTimeout(temporizadorFechamentoPesquisaMaterias);
        temporizadorFechamentoPesquisaMaterias = null;
    }

    painel.hidden = false;
    painel.setAttribute("aria-hidden", "false");
    painel.classList.remove("is-open");
    botao.setAttribute("aria-expanded", "true");
    botao.hidden = false;

    // O campo já fica focável imediatamente; a animação é apenas visual.
    campo?.focus({ preventScroll: true });

    setTimeout(() => {
        if (!painel.hidden) {
            painel.classList.add("is-open");
        }
    }, 10);

    renderizarListaDeMaterias(campo?.value || "");

    // Só retiramos a lupa depois que o campo terminou de se formar sobre ela.
    setTimeout(() => {
        if (!painel.hidden && painel.classList.contains("is-open")) {
            botao.hidden = true;
        }
    }, 250);
}

let temporizadorFechamentoPesquisaFases = null;

function fecharPesquisaFases(limpar = true) {
    const painel = $("pesquisa-fases");
    const botao = $("abrir-pesquisa-fases");
    if (!painel || !botao) return;

    if (temporizadorFechamentoPesquisaFases) {
        clearTimeout(temporizadorFechamentoPesquisaFases);
        temporizadorFechamentoPesquisaFases = null;
    }

    const estavaAberto = !painel.hidden && painel.classList.contains("is-open");
    botao.hidden = false;
    botao.setAttribute("aria-expanded", "false");
    painel.setAttribute("aria-hidden", "true");
    painel.classList.remove("is-open");

    if (limpar) {
        const campo = $("campo-pesquisa-fases");
        if (campo) campo.value = "";
        if (estado.materiaAcademicaAreaId || estado.materiaId) renderizarListaDeFases("");
    }

    if (!estavaAberto) {
        painel.hidden = true;
        botao.focus({ preventScroll: true });
        return;
    }

    temporizadorFechamentoPesquisaFases = setTimeout(() => {
        painel.hidden = true;
        painel.classList.remove("is-open");
        painel.setAttribute("aria-hidden", "true");
        temporizadorFechamentoPesquisaFases = null;
        botao.focus({ preventScroll: true });
    }, 260);
}

async function abrirPesquisaFases() {
    const painel = $("pesquisa-fases");
    const botao = $("abrir-pesquisa-fases");
    const campo = $("campo-pesquisa-fases");
    if (!painel || !botao) return;

    if (temporizadorFechamentoPesquisaFases) {
        clearTimeout(temporizadorFechamentoPesquisaFases);
        temporizadorFechamentoPesquisaFases = null;
    }

    painel.hidden = false;
    painel.setAttribute("aria-hidden", "false");
    painel.classList.remove("is-open");
    botao.setAttribute("aria-expanded", "true");
    botao.hidden = false;

    campo?.focus({ preventScroll: true });

    setTimeout(() => {
        if (!painel.hidden) {
            painel.classList.add("is-open");
        }
    }, 10);

    renderizarListaDeFases(campo?.value || "");

    setTimeout(() => {
        if (!painel.hidden && painel.classList.contains("is-open")) {
            botao.hidden = true;
        }
    }, 250);
}

function idiomaConteudoQuestao(item) {
    const table = estado.idioma === "en" ? estado.dadosSemiologia?.traducoesEN : estado.idioma === "es" ? estado.dadosSemiologia?.traducoesES : null;
    if (estado.materiaId === "semiologia" && table?.[item?.nome]?.pergunta) return estado.idioma;
    return window.SimunusContentLanguage.questionLanguage(item);
}

function obterTraducao(item, campo) {
    const idiomaDaQuestao = idiomaConteudoQuestao(item) || estado.idioma;
    // Bancos v3 (como Imagenologia) mantêm as traduções no próprio JSON.
    // O restante do aplicativo continua usando exatamente o mesmo pipeline.
    const traducoes = item?.translations && typeof item.translations === "object" ? item.translations : null;
    if (traducoes) {
        const chaveIdioma = idiomaDaQuestao === "pt" ? "pt-BR" : idiomaDaQuestao === "en" ? "en" : "es";
        const local = traducoes[chaveIdioma] || traducoes[idiomaDaQuestao] || traducoes["pt-BR"] || {};
        if (campo === "pergunta") return local.stem ?? "";
        if (campo === "descricao") return local.explanation ?? "";
        if (campo === "nome") return local.title ?? item?.classification?.subtopic ?? "";
        if (campo === "grupo") return item?.classification?.subtopic ?? item?.classification?.topic ?? "";
        if (campo === "alvo") return item?.tested_concept ?? "";
    }
    if (estado.customPhaseId) {
        if (idiomaDaQuestao === "pt") return item[`${campo}PT`] ?? item[campo] ?? "";
        if (idiomaDaQuestao === "en") return item[`${campo}EN`] ?? item[campo] ?? item[`${campo}PT`] ?? "";
        return item[campo] ?? item[`${campo}PT`] ?? "";
    }

    if (idiomaDaQuestao === "es") {
        if (estado.materiaId === "semiologia" && estado.dadosSemiologia?.traducoesES?.[item.nome]?.[campo]) {
            return estado.dadosSemiologia.traducoesES[item.nome][campo];
        }
        return item[`${campo}ES`] ?? item[campo] ?? "";
    }

    if (idiomaDaQuestao === "en") {
        if (estado.materiaId === "semiologia" && estado.dadosSemiologia?.traducoesEN?.[item.nome]?.[campo]) {
            return estado.dadosSemiologia.traducoesEN[item.nome][campo];
        }
        const ingles = item.ingles && typeof item.ingles === "object" ? item.ingles : {};
        const mapa = { pergunta: "pergunta", descricao: "descricao", alvo: "alvo", grupo: "grupo", nome: "nome" };
        if (campo === "pergunta" && (ingles.pergunta || ingles.stem)) return ingles.pergunta ?? ingles.stem;
        if (campo === "descricao" && (ingles.descricao || ingles.explanation)) return ingles.descricao ?? ingles.explanation;
        if (mapa[campo] && ingles[mapa[campo]]) return ingles[mapa[campo]];
        return item[`${campo}EN`] ?? item[campo] ?? item[`${campo}PT`] ?? "";
    }

    return item[`${campo}PT`] ?? item[campo] ?? "";
}

function obterRespostaLocalizada(item) {
    const idiomaDaQuestao = idiomaConteudoQuestao(item) || estado.idioma;
    const traducoes = item?.translations && typeof item.translations === "object" ? item.translations : null;
    if (traducoes) {
        const chaveIdioma = idiomaDaQuestao === "pt" ? "pt-BR" : idiomaDaQuestao === "en" ? "en" : "es";
        const local = traducoes[chaveIdioma] || traducoes[idiomaDaQuestao] || traducoes["pt-BR"] || {};
        const correta = item?.correct_option;
        if (correta && local.options && Object.prototype.hasOwnProperty.call(local.options, correta)) return local.options[correta];
    }
    if (estado.customPhaseId) {
        if (idiomaDaQuestao === "pt") return item.respostaPT ?? item.resposta ?? "";
        if (idiomaDaQuestao === "en") return item.respostaEN ?? item.resposta ?? item.respostaPT ?? "";
        return item.resposta ?? item.respostaPT ?? "";
    }
    if (estado.materiaId === "semiologia" && idiomaDaQuestao === "es" && estado.dadosSemiologia?.traducoesES?.[item.nome]?.nome) {
        return estado.dadosSemiologia.traducoesES[item.nome].nome;
    }
    if (estado.materiaId === "semiologia" && idiomaDaQuestao === "en" && estado.dadosSemiologia?.traducoesEN?.[item.nome]?.nome) {
        return estado.dadosSemiologia.traducoesEN[item.nome].nome;
    }
    if (idiomaDaQuestao === "en") {
        const ingles = item.ingles && typeof item.ingles === "object" ? item.ingles : {};
        if (ingles.resposta) return ingles.resposta;
        const alternativasEN = item.alternativas?.EN;
        if (alternativasEN && ingles.correctAnswer && alternativasEN[ingles.correctAnswer]) return alternativasEN[ingles.correctAnswer];
        if (ingles.options && ingles.correctAnswer && ingles.options[ingles.correctAnswer]) return ingles.options[ingles.correctAnswer];
        return item.respostaEN ?? item.resposta ?? item.respostaPT ?? item.nomeEN ?? item.nome ?? "";
    }
    if (idiomaDaQuestao === "es") return item.respostaES ?? item.resposta ?? item.nome ?? "";
    return item.respostaPT ?? item.resposta ?? item.nomePT ?? item.nome ?? "";
}
function traduzirResposta(item) {
    return obterRespostaLocalizada(item);
}

function atualizarCabecalhoDaFase() {
    if (estado.simuladoSupabase?.activityInfo) {
        const info = estado.simuladoSupabase.activityInfo;
        $("nome-materia-jogo").textContent = info.title || t().simuladoTitulo || "Simulado";
        $("subtitulo-jogo").textContent = info.description || info.code || "";
        return;
    }

    if (estado.customSubjectId) {
        const custom = CustomPhases.getSubjectById(estado.customSubjectId);
        if (!custom) return;
        $("nome-materia-jogo").textContent = custom.name;
        $("subtitulo-jogo").textContent = custom.description || ui().customSubject;
        return;
    }

    $("nome-materia-jogo").textContent = nomeMateriaPorId(estado.materiaId);
    $("subtitulo-jogo").textContent = nomeFasePorReferencia({
        subjectId: estado.materiaId,
        phaseNumber: estado.faseNumero
    });
}

function selecionarFasePersonalizada(faseId) {
    // Compatibilidade com dados criados pela versão anterior.
    const fase = CustomPhases.getById(faseId);
    if (!fase || !Array.isArray(fase.questions) || !fase.questions.length) return;
    iniciarMateriaPersonalizada(fase.id);
}


function criarAlternativas(pergunta) {
    const idiomaDaQuestao = idiomaConteudoQuestao(pergunta) || estado.idioma;
    const respostaCorreta = obterRespostaLocalizada(pergunta);
    let fornecidas = [];
    const traducoes = pergunta?.translations && typeof pergunta.translations === "object" ? pergunta.translations : null;
    if (traducoes) {
        const chaveIdioma = idiomaDaQuestao === "pt" ? "pt-BR" : idiomaDaQuestao === "en" ? "en" : "es";
        const local = traducoes[chaveIdioma] || traducoes[idiomaDaQuestao] || traducoes["pt-BR"] || {};
        if (local.options && typeof local.options === "object") {
            fornecidas = Object.entries(local.options)
                .filter(([letra]) => letra !== pergunta.correct_option)
                .map(([,valor]) => valor);
        }
    } else if (estado.customPhaseId) {
        fornecidas = idiomaDaQuestao === "pt"
            ? (Array.isArray(pergunta.incompativeisPT) ? pergunta.incompativeisPT : [])
            : (Array.isArray(pergunta.incompativeis) ? pergunta.incompativeis : []);
    } else if (idiomaDaQuestao === "pt") {
        fornecidas = Array.isArray(pergunta.incompativeisPT) ? pergunta.incompativeisPT : [];
    } else if (idiomaDaQuestao === "es") {
        fornecidas = Array.isArray(pergunta.incompativeis) ? pergunta.incompativeis : [];
    } else {
        const ingles = pergunta.ingles && typeof pergunta.ingles === "object" ? pergunta.ingles : {};
        const alternativasEN = pergunta.alternativas?.EN;
        if (Array.isArray(ingles.incompativeis)) fornecidas = ingles.incompativeis;
        else if (alternativasEN && ingles.correctAnswer) {
            fornecidas = Object.entries(alternativasEN).filter(([letra]) => letra !== ingles.correctAnswer).map(([,valor]) => valor);
        } else if (ingles.options && ingles.correctAnswer) {
            fornecidas = Object.entries(ingles.options).filter(([letra]) => letra !== ingles.correctAnswer).map(([,valor]) => valor);
        }
    }

    const doBanco = estado.bancoAtual
        .filter(item => idiomaConteudoQuestao(item) === idiomaDaQuestao)
        .map((item) => obterRespostaLocalizada(item))
        .filter((item) => item && item !== respostaCorreta);

    const limiteErradas = estado.customSubjectId ? 4 : 3;
    const erradas = embaralhar([...new Set([...fornecidas, ...doBanco])]).slice(0, limiteErradas);
    return embaralhar([respostaCorreta, ...erradas]);
}
function mostrarPergunta() {
    const atual = estado.perguntas[estado.perguntaAtual];
    if (atual) window.SimunusContentLanguage.notice(idiomaConteudoQuestao(atual));
    if (!atual) return;

    $("numero-questao").textContent = `${estado.perguntaAtual + 1}/${estado.perguntas.length}`;
    $("pontuacao").textContent = estado.pontos;
    // O identificador real da questão é a referência exibida no balão
    // acima do enunciado. Priorizamos o campo "id" quando ele existe;
    // os demais campos são apenas fallback para bancos antigos.
    const codigoQuestao = atual.id
        ?? (estado.idioma === "en"
            ? (atual.questionIdEN || atual.questionId || atual.codigo)
            : estado.idioma === "es"
                ? (atual.questionIdES || atual.questionId || atual.codigo)
                : (atual.questionIdPT || atual.questionId || atual.codigo));
    $("rotulo-questao").textContent = t().rotuloQuestao;
    $("rotulo-pontos").textContent = t().rotuloPontos;
    // Em revisão multimatéria, o indicador precisa seguir a referência real
    // da questão atual, não a primeira matéria da fila de revisão.
    const referenciaAtual = referenciaQuestao(atual, estado.perguntaAtual);
    const exibirGrupo = referenciaAtual.subjectId === "semiologia" && Number(referenciaAtual.phaseNumber) === 1;
    $("status-grupo").hidden = !exibirGrupo;
    $("status-questionario").classList.toggle("status-sem-grupo", !exibirGrupo);
    $("rotulo-grupo").textContent = t().rotuloGrupo;
    $("grupo-atual").textContent = obterTraducao(atual, "grupo") || "—";
    // Este é o balão localizado imediatamente acima do enunciado.
    // Ele deve mostrar o código/ID da questão atual, e não a palavra "Questão".
    $("tipo-questao").textContent = estado.customSubjectId
        ? String(estado.perguntaAtual + 1)
        : (codigoQuestao == null ? "" : String(codigoQuestao));

    const imagemQuestao = $("imagem-questao");
    imagemQuestao.innerHTML = "";
    imagemQuestao.hidden = true;
    imagemQuestao.classList.remove("erro", "imagem-questao-conjunto");
    imagemQuestao.setAttribute("aria-hidden", "true");

    // Resolve a mídia de qualquer banco em um único pipeline. Bancos legados
    // usam "imagem"; bancos novos podem usar "media", "image", "images"
    // ou "image_set". A estrutura original da questão nunca é alterada.
    const chaveIdiomaMidia = estado.idioma === "pt" ? "pt-BR" : estado.idioma === "en" ? "en" : "es";
    const normalizarSrcMidia = (src) => {
        if (typeof src === "string") return src.trim();
        if (!src || typeof src !== "object" || Array.isArray(src)) return "";
        return String(
            src[chaveIdiomaMidia]
            ?? src[estado.idioma]
            ?? src["pt-BR"]
            ?? src.en
            ?? src.es
            ?? src.pt
            ?? ""
        ).trim();
    };
    const resolverSrcMidia = (src) => {
        const valor = normalizarSrcMidia(src);
        if (!valor) return "";

        // Normaliza Unicode antes de montar a URL para evitar diferenças de
        // composição entre nomes de arquivos e referências vindas do JSON.
        const normalizado = typeof valor.normalize === "function" ? valor.normalize("NFC") : valor;
        if (/^(?:data:|blob:|https?:|file:)/i.test(normalizado)) return normalizado;

        try {
            const base = estado.mediaBase
                ? new URL(estado.mediaBase, document.baseURI)
                : new URL(document.baseURI);
            return new URL(normalizado, base).href;
        } catch (erro) {
            console.error("[Mídia] Não foi possível resolver a URL da imagem.", {
                questao: atual?.id ?? atual?.local_id ?? atual?.codigo ?? null,
                idioma: estado.idioma,
                referencia: valor,
                mediaBase: estado.mediaBase,
                base: document.baseURI,
                erro
            });
            return "";
        }
    };
    const adicionarMidias = (valor, destino) => {
        if (valor == null) return;
        if (Array.isArray(valor)) {
            valor.forEach((item) => adicionarMidias(item, destino));
            return;
        }
        if (typeof valor === "string") {
            const src = normalizarSrcMidia(valor);
            if (src) destino.push({ type: "image", src });
            return;
        }
        if (typeof valor !== "object") return;

        // Aceita tanto o descritor completo quanto estruturas abreviadas.
        const tipo = String(valor.type || "").toLowerCase();
        if (tipo === "image_set" || Array.isArray(valor.items)) {
            const itens = Array.isArray(valor.items) ? valor.items : [];
            destino.push({ type: "image_set", items: itens });
            return;
        }
        if (valor.src != null || valor.url != null || valor.image_url != null || valor.imageUrl != null) {
            destino.push({
                type: "image",
                src: valor.src ?? valor.url ?? valor.image_url ?? valor.imageUrl
            });
            return;
        }
        // Algumas estruturas legadas podem guardar a referência diretamente
        // dentro de uma chave de idioma.
        const src = normalizarSrcMidia(valor);
        if (src) destino.push({ type: "image", src });
    };

    const midias = [];
    adicionarMidias(atual?.media, midias);
    adicionarMidias(atual?.image, midias);
    adicionarMidias(atual?.images, midias);
    adicionarMidias(atual?.image_set, midias);
    if (!midias.length) adicionarMidias(atual?.imagem, midias);

    const altPadrao = estado.idioma === "en" ? "Question image" : estado.idioma === "es" ? "Imagen de la pregunta" : "Imagem da questão";
    const criarImagem = (src, label = "") => {
        const caminho = resolverSrcMidia(src);
        if (!caminho) return null;
        const figure = document.createElement("figure");
        figure.className = "imagem-questao-item";
        const img = document.createElement("img");
        img.alt = label ? `${label} — ${altPadrao}` : altPadrao;
        img.loading = "eager";
        img.decoding = "async";
        img.src = caminho;
        img.addEventListener("error", () => {
            console.error("[Mídia] Falha ao carregar imagem da questão.", {
                questao: atual?.id ?? atual?.local_id ?? atual?.codigo ?? null,
                idioma: estado.idioma,
                src: caminho,
                referencia: normalizarSrcMidia(src)
            });
            img.hidden = true;
            const aviso = document.createElement("span");
            aviso.className = "imagem-questao-item-erro";
            aviso.textContent = estado.idioma === "en" ? "Unable to load the image." : estado.idioma === "es" ? "No fue posible cargar la imagen." : "Não foi possível carregar a imagem.";
            figure.appendChild(aviso);
        }, { once: true });
        if (label) {
            const caption = document.createElement("figcaption");
            caption.textContent = label;
            figure.appendChild(caption);
        }
        figure.appendChild(img);
        return figure;
    };

    const temConjunto = midias.some((media) => media?.type === "image_set" && Array.isArray(media.items));
    if (temConjunto) imagemQuestao.classList.add("imagem-questao-conjunto");

    midias.forEach((media) => {
        if (media?.type === "image_set" && Array.isArray(media.items)) {
            media.items.forEach((item) => {
                const figure = criarImagem(item?.src ?? item?.url ?? item?.image_url ?? item?.imageUrl, item?.label || "");
                if (figure) imagemQuestao.appendChild(figure);
            });
            return;
        }
        if (media?.type === "image" || media?.src != null) {
            const figure = criarImagem(media.src);
            if (figure) imagemQuestao.appendChild(figure);
        }
    });

    if (imagemQuestao.childElementCount) {
        imagemQuestao.hidden = false;
        imagemQuestao.setAttribute("aria-hidden", "false");
    }

    $("pergunta").textContent = obterTraducao(atual, "pergunta");
    atualizarBotaoMarcacao();
    $("alternativas").setAttribute("aria-label", t().alternativas);
    $("alternativas").innerHTML = "";
    $("feedback").innerHTML = "";
    $("feedback").className = "feedback vazio";
    $("proxima").disabled = true;

    const alternativas = criarAlternativas(atual);
    alternativas.forEach((alternativa) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "alternativa";
        botao.dataset.resposta = alternativa;
        botao.textContent = alternativa;
        botao.addEventListener("click", () => responder(botao, alternativa, atual));
        $("alternativas").appendChild(botao);
    });
}

function responder(botaoClicado, respostaEscolhida, pergunta) {
    const botoes = document.querySelectorAll(".alternativa");
    botoes.forEach((botao) => { botao.disabled = true; });

    const correta = obterRespostaLocalizada(pergunta);
    const acertou = respostaEscolhida === correta;
    const ref = referenciaQuestao(pergunta, estado.perguntaAtual);
    const questionKey = chaveReferencia(ref);
    if (sessaoEstudo.modo !== "review") {
        const anterior = dadosEstudo.questions[questionKey] || {};
        dadosEstudo.questions[questionKey] = { ref, correct: acertou, attempts: (Number(anterior.attempts) || 0) + 1, correctAttempts: (Number(anterior.correctAttempts) || 0) + (acertou ? 1 : 0), lastAnsweredAt: new Date().toISOString() };
        sessaoEstudo.respostas.push({ ref, key: questionKey, correct: acertou });
        salvarDadosEstudo();
    }
    const feedback = $("feedback");

    if (acertou) {
        botaoClicado.classList.add("correta");
        estado.pontos += 10;
        estado.acertos++;
        feedback.className = "feedback certo";
        feedback.innerHTML = `
            <strong>${escaparHTML(t().correto)}</strong><br>
            ${escaparHTML(t().resposta)} <strong>${escaparHTML(traduzirResposta(pergunta))}</strong>.
            <br><br><strong>${escaparHTML(t().descricao)}</strong> ${escaparHTML(obterTraducao(pergunta, "descricao"))}
            <br><strong>${escaparHTML(t().alvo)}</strong> ${escaparHTML(obterTraducao(pergunta, "alvo"))}
        `;
    } else {
        botaoClicado.classList.add("errada");
        estado.erros++;
        botoes.forEach((botao) => {
            if (botao.dataset.resposta === correta) botao.classList.add("correta");
        });
        feedback.className = "feedback errado";
        feedback.innerHTML = `
            <strong>${escaparHTML(t().incorreto)}</strong><br>
            ${escaparHTML(t().respostaCorreta)} <strong>${escaparHTML(traduzirResposta(pergunta))}</strong>.
            <br><br><strong>${escaparHTML(t().descricao)}</strong> ${escaparHTML(obterTraducao(pergunta, "descricao"))}
            <br><strong>${escaparHTML(t().alvo)}</strong> ${escaparHTML(obterTraducao(pergunta, "alvo"))}
        `;
    }

    $("pontuacao").textContent = estado.pontos;
    $("proxima").disabled = false;

    const feedbackVisivel = $("feedback");
    rolarSuavementeAteFeedback(feedbackVisivel);
}

function rolarSuavementeAteFeedback(elemento) {
    if (!elemento) return;

    const reduzirMovimento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alvo = elemento.getBoundingClientRect().top + window.scrollY - (window.innerHeight - elemento.offsetHeight) / 2;
    const inicio = window.scrollY;

    if (reduzirMovimento) {
        window.scrollTo(0, Math.max(0, alvo));
        return;
    }

    const distancia = alvo - inicio;
    const duracao = Math.min(650, Math.max(420, Math.abs(distancia) * 0.55));
    const inicioTempo = performance.now();

    const animar = (agora) => {
        const progresso = Math.min(1, (agora - inicioTempo) / duracao);
        const suave = 1 - Math.pow(1 - progresso, 3);
        window.scrollTo(0, inicio + distancia * suave);
        if (progresso < 1) requestAnimationFrame(animar);
    };

    requestAnimationFrame(animar);
}

function iniciarQuestionario() {
    if (!Array.isArray(estado.bancoAtual) || estado.bancoAtual.length === 0) return;

    // Ao entrar no fluxo legado, remove qualquer estado residual de um simulado Supabase.
    estado.simuladoSupabase = null;
    estado.resultadoSupabase = null;

    estado.perguntas = embaralhar(estado.bancoAtual);
    estado.perguntaAtual = 0;
    estado.pontos = 0;
    estado.acertos = 0;
    estado.erros = 0;
    estado.modoRevisao = false;
    $("titulo-jogo").dataset.review = "false";
    sessaoEstudo = { respostas: [], inicio: Date.now(), modo: "normal", refs: [], completionRecorded: false };
    card.classList.remove("escondido");
    resultadoFinal.classList.add("escondido");
    mostrarPergunta();
}

function renderizarResultadoFinal({
    total,
    acertos,
    erros,
    naoRespondidas = 0,
    porcentagem,
    emRevisao = false,
    permitirCompartilhar = false,
    mostrarRevisao = false,
    tituloResultado = ui().phaseFinished,
    aoAtualizarDashboard = null,
    configurarProximaFase = null,
    compartilhar = null
}) {
    card.classList.add("escondido");
    resultadoFinal.classList.remove("escondido");

    const tempoSegundos = Math.max(
        0,
        Math.round(
            (Date.now() - (sessaoEstudo.inicio || Date.now())) / 1000
        )
    );

    const tempoFormatado =
        `${String(Math.floor(tempoSegundos / 60)).padStart(2, "0")}:` +
        `${String(tempoSegundos % 60).padStart(2, "0")}`;

    let detalhes =
        `<p>${acertos} ${escaparHTML(t().acertos)} · ` +
        `${erros} ${escaparHTML(t().erros)}`;

    if (naoRespondidas > 0) {
        detalhes += ` · ${naoRespondidas} não respondidas`;
    }

    detalhes +=
        ` · ${escaparHTML(ui().time)} ${tempoFormatado}</p>`;

    $("resultado-detalhes").innerHTML = detalhes;

    if ($("compartilhar-resultado")) {
        $("compartilhar-resultado").hidden = !permitirCompartilhar;
    }

    $("revisar-erros-sessao").hidden = !mostrarRevisao;

    const botaoProximaFase = $("proxima-fase-resultado");
    botaoProximaFase.hidden = true;
    botaoProximaFase.disabled = false;
    if (typeof configurarProximaFase === "function") configurarProximaFase(botaoProximaFase);

    $("reiniciar").querySelector("span").textContent =
        emRevisao ? ui().back : t().novamente.replace(/^🔄\s*/, "");

    if (typeof aoAtualizarDashboard === "function") aoAtualizarDashboard();

    $("titulo-resultado").textContent =
        tituloResultado;

    $("mensagem-final").textContent =
        porcentagem >= 90
            ? t().excelente
            : porcentagem >= 70
                ? t().muitoBom
                : porcentagem >= 50
                    ? t().bomComeco
                    : t().continueEstudando;

    $("rotulo-pontuacao-final").textContent =
        t().suaPontuacao;

    $("rotulo-acertos-final").textContent =
        t().acertos;

    $("rotulo-erros-final").textContent =
        t().erros;

    $("rotulo-aproveitamento-final").textContent =
        t().aproveitamento;

    $("pontuacao-final").textContent =
        estado.pontos;

    $("acertos-final").textContent =
        acertos;

    $("erros-final").textContent =
        erros;

    $("porcentagem-final").textContent =
        `${porcentagem}%`;

    if (compartilhar) ShareCardEngine.prepare(compartilhar);
}

function finalizarSupabase() {
    const resultadoBackend = estado.resultadoSupabase || null;

    if (!resultadoBackend) {
        console.error(
            "[Supabase] Resultado oficial ausente. Finalização interrompida."
        );

        card.classList.remove("escondido");
        resultadoFinal.classList.add("escondido");

        const feedback = $("feedback");
        if (feedback) {
            feedback.className = "feedback errado";
            feedback.textContent = t().erroInesperado;
        }

        return;
    }

    // Supabase é a fonte oficial quando houver resultado do backend.
    const total = Number(resultadoBackend.total_questions) || 0;
    const acertos = Number(resultadoBackend.correct_answers) || 0;
    const erros = Number(resultadoBackend.incorrect_answers) || 0;
    const naoRespondidas = Number(resultadoBackend.unanswered_questions) || 0;
    const porcentagem = Number(resultadoBackend.score_percentage) || 0;

    // Mantém estado visual sincronizado com o resultado oficial.
    estado.acertos = acertos;
    estado.erros = erros;
    estado.pontos = acertos * 10;

    const emRevisao = sessaoEstudo.modo === "review";
    const contextoFaseConcluida = estado.simuladoSupabase?.activityInfo;

    renderizarResultadoFinal({
        total,
        acertos,
        erros,
        naoRespondidas,
        porcentagem,
        emRevisao,
        permitirCompartilhar: !emRevisao,
        mostrarRevisao: !emRevisao,
        tituloResultado: emRevisao ? ui().reviewFinished : ui().phaseFinished,
        aoAtualizarDashboard: () => atualizarDashboard(),
        configurarProximaFase: (botaoProximaFase) => {
            // A próxima fase acadêmica é definida pelo catálogo Supabase, nunca pelo catálogo local.
            if (!emRevisao && contextoFaseConcluida?.source === "academic_phase"
                && contextoFaseConcluida.areaId && contextoFaseConcluida.topicId) {
                const tentativaExibida = estado.simuladoSupabase?.attemptId;
                // Consultar novamente para não usar catálogo obsoleto após publicação de fases.
                estado.catalogoAcademico = null;
                carregarCatalogoAcademico().then(() => {
                    if (estado.simuladoSupabase?.attemptId !== tentativaExibida
                        || resultadoFinal.classList.contains("escondido")) return;
                    botaoProximaFase.hidden = !proximaFaseAcademica(contextoFaseConcluida);
                }).catch(erro => console.error("[Supabase] Próxima fase indisponível.", erro));
            }
        },
        compartilhar: {
            type: "simulation",
            score: porcentagem,
            correct: acertos,
            total,
            subjectName: estado.simuladoSupabase?.title || "Simulado",
            phaseName: estado.simuladoSupabase?.title || "Simulado",
            best: undefined
        }
    });
}

function finalizarFasePessoal() {
    const total = Array.isArray(estado.perguntas) ? estado.perguntas.length : 0;
    const acertos = Number(estado.acertos) || 0;
    const erros = Number(estado.erros) || 0;
    const respondidas = Math.max(0, Math.min(total, acertos + erros));
    const naoRespondidas = Math.max(0, total - respondidas);
    const porcentagem = respondidas ? Math.round(acertos / respondidas * 100) : 0;
    const materiaCustom = estado.customSubjectId
        ? CustomPhases.getSubjectById(estado.customSubjectId)
        : null;
    const nomeFase = materiaCustom?.name || ui().customPhase;

    estado.pontos = acertos * 10;

    renderizarResultadoFinal({
        total,
        acertos,
        erros,
        naoRespondidas,
        porcentagem,
        emRevisao: false,
        permitirCompartilhar: true,
        mostrarRevisao: false,
        tituloResultado: ui().phaseFinished,
        compartilhar: {
            type: "phase",
            score: porcentagem,
            correct: acertos,
            total,
            subjectName: nomeFase,
            phaseName: nomeFase,
            best: undefined
        }
    });
}

function finalizar() {
    if (estado.simuladoSupabase) finalizarSupabase();
    else finalizarFasePessoal();
}

/* ============================================================
   SHARE PROGRESS ENGINE
   Compartilhamento textual usando Web Share API + Clipboard.
   ============================================================ */
const ShareCardEngine = (() => {
    const state = {
        type: "phase",
        subjectId: null,
        phaseScore: 0,
        subjectName: "",
        phaseName: "",
        phaseTotal: 0,
        phaseCorrect: 0,
        phaseBest: null,
        mode: "phase",
        busy: false,
        shareText: ""
    };

    function formatNumber(value) {
        return new Intl.NumberFormat(
            estado.idioma === "en" ? "en-US" : estado.idioma === "es" ? "es-ES" : "pt-BR"
        ).format(Number(value) || 0);
    }

    function metrics() {
        const summary = estado.dashboardEstudo?.summary || {};
        const answered = Number(summary.answered_questions) || 0;
        const correct = Number(summary.correct_answers) || 0;
        const accuracy = normalizarPercentualVisual(summary.accuracy_percentage);
        return {
            overall: accuracy,
            answered,
            correct,
            errors: Math.max(0, answered - correct),
            subjects: subjectsFromDashboard()
        };
    }

    function subjectsFromDashboard() {
        const areas = Array.isArray(estado.dashboardEstudo?.areas) ? estado.dashboardEstudo.areas : [];
        return areas.map((area) => ({
            id: String(area.area_id),
            name: String(area.area_name || ""),
            stats: {
                answered: Number(area.answered_questions) || 0,
                correct: Number(area.correct_answers) || 0,
                errors: Number(area.incorrect_answers) || 0,
                performance: normalizarPercentualVisual(area.accuracy_percentage)
            }
        }));
    }

    function dailyProgress() {
        const evolution = Array.isArray(estado.dashboardEstudo?.evolution)
            ? estado.dashboardEstudo.evolution
                .filter((item) => Number(item?.answered_questions) > 0)
                .slice()
                .sort((a, b) => Date.parse(a.submitted_at || 0) - Date.parse(b.submitted_at || 0))
            : [];
        const todayRow = evolution.at(-1) || null;
        const previousRow = evolution.length > 1 ? evolution.at(-2) : null;
        const today = todayRow ? {
            successRate: normalizarPercentualVisual(todayRow.accuracy_percentage),
            totalQuestions: Number(todayRow.answered_questions) || 0
        } : null;
        const previous = previousRow ? {
            successRate: normalizarPercentualVisual(previousRow.accuracy_percentage),
            totalQuestions: Number(previousRow.answered_questions) || 0
        } : null;
        const delta = today && previous
            ? Math.round(Number(today.successRate) - Number(previous.successRate))
            : null;
        return { today, previous, delta };
    }

    function getSubject() {
        return metrics().subjects.find((item) => String(item.id) === String(state.subjectId)) || null;
    }

    function buildShareText() {
        const uiText = ui();

        if (state.type === "simulation") {
            const total = Math.max(0, Number(state.phaseTotal) || 0);
            const correct = Math.max(0, Number(state.phaseCorrect) || 0);
            const errors = Math.max(0, total - correct);
            const simulationLabel = estado.idioma === "en" ? "Simulation" : "Simulado";
            return [
                uiText.shareResultHeader,
                "",
                `📝 ${simulationLabel}: ${state.subjectName || "Simulado"}`,
                "",
                `${uiText.shareAccuracy}: ${Math.round(Number(state.phaseScore) || 0)}%`,
                `${uiText.shareQuestionsLabel}: ${formatNumber(total)}`,
                `${uiText.shareCorrectLabel}: ${formatNumber(correct)}`,
                `${uiText.shareErrorsLabel}: ${formatNumber(errors)}`,
                "",
                uiText.shareNoActivity
            ].join("\n");
        }

        if (state.type === "phase") {
            const total = Math.max(0, Number(state.phaseTotal) || 0);
            const correct = Math.max(0, Number(state.phaseCorrect) || 0);
            const errors = Math.max(0, total - correct);
            const lines = [
                uiText.shareResultHeader,
                "",
                `${uiText.shareSubjectLabel}: ${state.subjectName || uiText.customSubject}`,
                `${uiText.sharePhaseLabel}: ${state.phaseName || uiText.customPhase}`,
                "",
                `${uiText.shareAccuracy}: ${Math.round(Number(state.phaseScore) || 0)}%`,
                `${uiText.shareQuestionsLabel}: ${formatNumber(total)}`,
                `${uiText.shareCorrectLabel}: ${formatNumber(correct)}`,
                `${uiText.shareErrorsLabel}: ${formatNumber(errors)}`
            ];

            if (Number.isFinite(state.phaseBest) && state.phaseBest > 0) {
                lines.push(`${uiText.shareBestLabel}: ${Math.round(state.phaseBest)}%`);
            }

            lines.push("", uiText.shareNoActivity);
            return lines.join("\n");
        }

        const m = state.mode === "subject" ? getSubject() : null;
        if (m) {
            const answered = Number(m.stats.answered) || 0;
            const correct = Number(m.stats.correct) || 0;
            const errors = Math.max(0, answered - correct);
            return [
                uiText.shareProgressHeader,
                "",
                `${uiText.shareSubjectLabel}: ${m.name}`,
                `${uiText.shareAccuracy}: ${Math.round(Number(m.stats.performance) || 0)}%`,
                `${uiText.shareQuestionsLabel}: ${formatNumber(answered)}`,
                `${uiText.shareCorrectLabel}: ${formatNumber(correct)}`,
                `${uiText.shareErrorsLabel}: ${formatNumber(errors)}`,
                "",
                uiText.shareNoActivity
            ].join("\n");
        }

        const daily = dailyProgress();
        const lines = [
            uiText.shareProgressHeader,
            "",
            `${uiText.shareAccuracy}: ${Math.round(Number(metrics().overall) || 0)}%`,
            `${uiText.shareQuestionsLabel}: ${formatNumber(metrics().answered)}`,
            `${uiText.shareCorrectLabel}: ${formatNumber(metrics().correct)}`,
            `${uiText.shareErrorsLabel}: ${formatNumber(metrics().errors)}`
        ];

        if (daily.today) {
            lines.push(
                "",
                `${uiText.shareTodayLabel}: ${Math.round(Number(daily.today.successRate) || 0)}% · ${formatNumber(daily.today.totalQuestions)} ${uiText.questions}`
            );
        }
        if (daily.previous) {
            const previousRate = Math.round(Number(daily.previous.successRate) || 0);
            lines.push(`${uiText.sharePreviousLabel}: ${previousRate}%`);
        }
        if (daily.delta !== null) {
            const sign = daily.delta > 0 ? "+" : "";
            lines.push(`${uiText.shareChangeLabel}: ${sign}${daily.delta} ${uiText.sharePoints}`);
        }

        lines.push("", uiText.shareNoActivity);
        return lines.join("\n");
    }

    function updatePreview() {
        state.shareText = buildShareText();
        const preview = $("share-card-preview-text");
        if (preview) preview.textContent = state.shareText;

        const title = $("share-card-title");
        if (title) title.textContent = ["phase", "simulation"].includes(state.type) ? ui().shareTitle : ui().shareEvolutionTitle;

        const nativeButton = $("share-card-native");
        if (nativeButton) nativeButton.textContent = ["phase", "simulation"].includes(state.type) ? ui().shareTitle : ui().shareDevice;
    }

    function setBusy(busy) {
        state.busy = busy;
        ["share-card-native", "share-card-copy"].forEach((id) => {
            const button = $(id);
            if (button) {
                button.disabled = busy;
                button.setAttribute("aria-busy", String(busy));
            }
        });
    }

    function feedback(message) {
        const element = $("share-card-feedback");
        if (!element) return;
        element.textContent = message;
        clearTimeout(element._timer);
        element._timer = setTimeout(() => { element.textContent = ""; }, 3500);
    }

    async function copyToClipboard(text) {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (_) {}
        }

        try {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.setAttribute("readonly", "");
            textarea.style.position = "fixed";
            textarea.style.left = "-9999px";
            textarea.style.top = "0";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            const copied = document.execCommand("copy");
            textarea.remove();
            return copied;
        } catch (_) {
            return false;
        }
    }

    async function copyShareText() {
        if (state.busy) return;
        setBusy(true);
        try {
            const text = buildShareText();
            state.shareText = text;
            const copied = await copyToClipboard(text);
            feedback(copied ? ui().shareCopied : ui().shareCopyFailed);
        } finally {
            setBusy(false);
        }
    }

    async function share() {
        if (state.busy) return;
        setBusy(true);
        try {
            const text = buildShareText();
            state.shareText = text;

            if (typeof navigator.share === "function") {
                try {
                    await navigator.share({
                        title: ["phase", "simulation"].includes(state.type) ? ui().shareTitle : ui().shareEvolutionTitle,
                        text
                    });
                    return;
                } catch (error) {
                    if (error?.name === "AbortError") return;
                    console.warn("Web Share indisponível; usando fallback de cópia:", error);
                    const copied = await copyToClipboard(text);
                    feedback(copied ? ui().shareNativeFailed : ui().shareCopyFailed);
                    return;
                }
            }

            const copied = await copyToClipboard(text);
            feedback(copied ? ui().shareNativeUnavailable : ui().shareCopyFailed);
        } finally {
            setBusy(false);
        }
    }

    function setPhaseState(options = {}) {
        state.type = options.type || "phase";
        state.mode = ["phase", "simulation"].includes(state.type) ? "phase" : "overall";
        state.subjectId = null;
        state.phaseScore = Number(options.score) || Number($("porcentagem-final")?.textContent.replace("%", "")) || 0;
        state.subjectName = options.subjectName || (
            estado.customSubjectId
                ? (CustomPhases.getSubjectById(estado.customSubjectId)?.name || ui().customSubject)
                : nomeMateriaPorId(estado.materiaId)
        );
        state.phaseName = options.phaseName || (
            estado.customSubjectId
                ? ui().customPhase
                : nomeFasePorReferencia({ subjectId: estado.materiaId, phaseNumber: estado.faseNumero })
        );
        state.phaseTotal = Number(options.total) || estado.perguntas.length || 0;
        state.phaseCorrect = Number(options.correct ?? estado.acertos) || 0;
        state.phaseBest = Number(options.best);
        if (!Number.isFinite(state.phaseBest) || state.phaseBest <= 0) state.phaseBest = null;
        state.shareText = "";
    }

    function populateSubjects() {
        const select = $("share-card-subject");
        if (!select) return;
        const list = subjectsFromDashboard();
        select.replaceChildren();

        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = estado.idioma === "en"
            ? "Select a subject"
            : estado.idioma === "es"
                ? "Selecciona una materia"
                : "Selecione uma matéria";
        placeholder.disabled = list.length > 0;
        placeholder.selected = !state.subjectId || !list.some((item) => String(item.id) === String(state.subjectId));
        select.appendChild(placeholder);

        list.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.id;
            option.textContent = item.name;
            option.selected = String(item.id) === String(state.subjectId);
            select.appendChild(option);
        });

        if (!list.length) {
            placeholder.textContent = estado.idioma === "en"
                ? "No subjects available"
                : estado.idioma === "es"
                    ? "No hay materias disponibles"
                    : "Nenhuma matéria disponível";
        }
        select.hidden = state.mode !== "subject";
    }

    function updateControls() {
        document.querySelectorAll("[data-share-type]").forEach((button) => {
            button.classList.toggle("is-active", button.dataset.shareType === state.mode);
        });
        const select = $("share-card-subject");
        if (select) select.hidden = state.mode !== "subject";
        updatePreview();
    }

    function open(options = {}) {
        if (Object.keys(options).length > 0) {
            setPhaseState(options);
        }
        const modal = $("modal-share-card");
        if (!modal) return;

        if (state.type === "overall") populateSubjects();
        updateControls();

        modal.classList.remove("escondido");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("share-card-aberto");

        const modalContent = modal.querySelector(".share-card-modal");
        if (modalContent) {
            modalContent.classList.remove("share-card-modal-fechando", "share-card-modal-abrindo");
            void modalContent.offsetWidth;
            modalContent.classList.add("share-card-modal-abrindo");
        }
    }

    function prepare(options = {}) {
        setPhaseState(options);
        return Promise.resolve(updatePreview());
    }

    function finalizeClose() {
        const modal = $("modal-share-card");
        if (!modal) return;
        const modalContent = modal.querySelector(".share-card-modal");
        modalContent?.classList.remove("share-card-modal-fechando", "share-card-modal-abrindo");
        modal.classList.add("escondido");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("share-card-aberto");
    }

    function close() {
        const modal = $("modal-share-card");
        if (!modal || modal.classList.contains("escondido")) return;
        const modalContent = modal.querySelector(".share-card-modal");
        if (!modalContent) {
            finalizeClose();
            return;
        }
        modalContent.classList.remove("share-card-modal-abrindo", "share-card-modal-fechando");
        void modalContent.offsetWidth;
        modalContent.classList.add("share-card-modal-fechando");
    }

    return {
        open,
        close,
        prepare,
        share,
        copyShareText,
        buildShareText,
        state,
        populateSubjects,
        updateControls,
        finalizeClose
    };
})();


$("fechar-share-card")?.addEventListener("click", () => ShareCardEngine.close());
$("modal-share-card")?.querySelector(".share-card-modal")?.addEventListener("animationend", (event) => {
    if (event.animationName === "relatoModalSaida" && event.currentTarget.classList.contains("share-card-modal-fechando")) {
        ShareCardEngine.finalizeClose?.();
    }
});
$("modal-share-card")?.addEventListener("click", (event) => {
    if (event.target.id === "modal-share-card") ShareCardEngine.close();
});
document.querySelectorAll("[data-share-type]").forEach((button) => button.addEventListener("click", () => {
    if (ShareCardEngine.state.type === "phase") return;
    ShareCardEngine.state.mode = button.dataset.shareType;
    ShareCardEngine.state.subjectId = null;
    ShareCardEngine.populateSubjects();
    ShareCardEngine.updateControls();
}));
$("share-card-subject")?.addEventListener("change", (event) => {
    ShareCardEngine.state.subjectId = event.target.value;
    ShareCardEngine.updateControls();
});
$("share-card-copy")?.addEventListener("click", () => ShareCardEngine.copyShareText());
$("share-card-native")?.addEventListener("click", () => ShareCardEngine.share());
$("compartilhar-resultado")?.addEventListener("click", () => {
    ShareCardEngine.open();
});
$("compartilhar-evolucao")?.addEventListener("click", () => {
    ShareCardEngine.open({ type: "overall" });
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !$("modal-share-card")?.classList.contains("escondido")) ShareCardEngine.close(); });

function telaVisivelAtual() {
    const telas = [telaAcesso, telaCadastro, telaIdioma, telaAcessoPendente, telaRenovarPlano, telaBoasVindas, telaDashboard, telaMaterias, telaSuasFases, telaListaFasesCustom, telaFases, telaJogo, telaConfiguracoes].filter(Boolean);
    return telas.find((tela) => tela.classList.contains("tela-visivel")) || null;
}

async function voltarTelaAnterior() {
    const telaAtual = telaVisivelAtual();
    if (telaAtual === telaAcesso) return;
    const destino = historicoTelas.pop();
    if (!destino || destino === telaAtual) return;

    if (destino === telaMaterias) {
        estado.materiaId = null;
        limparEstadoDoQuestionario();
        await mostrarMaterias(false);
        return;
    }

    if (destino === telaFases) {
        // Fases acadêmicas (Supabase) não usam estado.materiaId.
        // Preserva a área que originou a tentativa antes de limpar o estado
        // transitório do questionário, evitando fallback para a navegação
        // acadêmica local antiga.
        const areaAcademicaId = estado.materiaAcademicaAreaId;

        estado.carregamentoId++;
        estado.bancoAtual = [];
        estado.perguntas = [];
        estado.perguntaAtual = 0;
        estado.pontos = 0;
        estado.acertos = 0;
        estado.erros = 0;
        estado.faseNumero = null;
        estado.customPhaseId = null;

        if (!areaAcademicaId) {
            await mostrarMaterias(false);
            return;
        }

        try {
            await carregarDashboardEstudo();
        } catch (erro) {
            console.warn("[Dashboard] Não foi possível atualizar o desempenho das fases.", erro);
        }
        abrirMateriaAcademica(areaAcademicaId, false);
        return;
    }

    if (destino === telaSuasFases) {
        abrirTelaSuasFases(false);
        return;
    }

    if (destino === telaListaFasesCustom) {
        mostrarListaFasesCustom("todas", false);
        return;
    }

    if (destino === telaDashboard) {
        abrirDashboard(false);
        return;
    }

    mostrarTela(destino, false);
}

function voltarParaMaterias() {
    estado.materiaId = null;
    limparEstadoDoQuestionario();
    mostrarMaterias();
}

function voltarParaFases() {
    const eraMateriaPersonalizada = Boolean(estado.customSubjectId);
    const areaAcademicaId = estado.materiaAcademicaAreaId
        || estado.simuladoSupabase?.activityInfo?.areaId
        || null;
    estado.carregamentoId++;
    estado.bancoAtual = [];
    estado.perguntas = [];
    estado.faseNumero = null;
    estado.customPhaseId = null;
    estado.customSubjectId = null;
    if (eraMateriaPersonalizada) {
        estado.materiaId = null;
        mostrarMaterias();
    } else if (areaAcademicaId) {
        abrirMateriaAcademica(areaAcademicaId);
    } else {
        mostrarMaterias();
    }
}

function escaparValorFormulario(valor) { return String(valor ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"); }

function fecharCustomModal() {
    const layer = $("custom-phases-layer");
    if (!layer) return;
    layer.hidden = true;
    layer.innerHTML = "";
    document.body.classList.remove("custom-modal-aberto");
}

function customModalBase(conteudo, titulo, largura="normal", onClose = fecharCustomModal) {
    const layer = $("custom-phases-layer");
    layer.hidden = false;
    layer.innerHTML = `<div class="custom-modal-backdrop" data-custom-close="true"><div class="custom-modal ${largura === "wide" ? "custom-modal-wide" : ""}" role="dialog" aria-modal="true" aria-labelledby="custom-modal-title"><div class="custom-modal-head"><h2 id="custom-modal-title">${escaparValorFormulario(titulo)}</h2><button type="button" class="custom-fechar" data-custom-close="true" aria-label="${escaparValorFormulario(t().fechar)}">${ICONE_UI.x}</button></div>${conteudo}</div></div>`;
    document.body.classList.add("custom-modal-aberto");
    layer.querySelectorAll("[data-custom-close]").forEach((el) => el.addEventListener("click", (ev) => { if (ev.target === el || el.classList.contains("custom-fechar")) onClose(); }));
}

function mostrarEditorFase(faseRef = null) {
    const isDraft = faseRef && typeof faseRef === "object";
    const materia = isDraft ? faseRef : (faseRef ? CustomPhases.getSubjectById(faseRef) : null);
    const questoes = Array.isArray(materia?.questions) ? materia.questions : [];
    const qCards = questoes.map((q, i) => `
        <div class="custom-q-card" data-q-index="${i}">
            <div>
                <strong>${i + 1}. ${escaparValorFormulario(q.nomePT || q.nome || (estado.idioma === "es" ? "Pregunta" : estado.idioma === "en" ? "Question" : "Questão"))}</strong>
                <span>${escaparValorFormulario((q.perguntaPT || q.pergunta || "").slice(0, 110))}${(q.perguntaPT || q.pergunta || "").length > 110 ? "…" : ""}</span>
            </div>
            <div class="custom-q-actions">
                <button type="button" data-q-edit="${i}">${menuIcon.edit}<span>${escaparValorFormulario(t().editar)}</span></button>
                <button type="button" data-q-dup="${i}" aria-label="${escaparValorFormulario(t().duplicar)}">${ICONE_UI.copy}</button>
                <button type="button" data-q-del="${i}" aria-label="${escaparValorFormulario(t().excluir)}">${ICONE_UI.trash}</button>
            </div>
        </div>`).join("");

    const phaseDraft = isDraft ? materia : (materia ? JSON.parse(JSON.stringify(materia)) : {
        id: "",
        name: "",
        description: "",
        category: "",
        group: "",
        difficulty: "normal",
        language: "bilíngue",
        questions: [],
        favorite: false
    });

    customModalBase(`
        <form id="custom-phase-form" class="custom-form">
            <input type="hidden" id="custom-phase-id" value="${escaparValorFormulario(phaseDraft.id || "")}">
            <div class="custom-grid">
                <label>${escaparValorFormulario(t().nomeMateria)} *
                    <input id="custom-name" placeholder="${escaparValorFormulario(window.SimunusI18n.t("common", "exampleAnatomy"))}" required maxlength="100" value="${escaparValorFormulario(phaseDraft.name || "")}">
                </label>
                <label>${escaparValorFormulario(t().temaMateria)}
                    <input id="custom-category" placeholder="${escaparValorFormulario(window.SimunusI18n.t("common", "exampleBones"))}" maxlength="100" value="${escaparValorFormulario(phaseDraft.category || "")}">
                </label>
                <label class="custom-full">${escaparValorFormulario(t().descricaoMateria)}
                    <textarea id="custom-description" placeholder="${escaparValorFormulario(window.SimunusI18n.t("common", "exampleStudy"))}" maxlength="220">${escaparValorFormulario(phaseDraft.description || "")}</textarea>
                </label>
                <label>${escaparValorFormulario(t().grupoMateria)}
                    <input id="custom-group" maxlength="100" placeholder="${escaparValorFormulario(window.SimunusI18n.t("common", "exampleSkeleton"))}" value="${escaparValorFormulario(phaseDraft.group || "")}">
                </label>
                <label hidden>${escaparValorFormulario(t().dificuldade)}
                    <select id="custom-difficulty">
                        <option value="facil">${escaparValorFormulario(t().facil)}</option>
                        <option value="normal">${escaparValorFormulario(t().normal)}</option>
                        <option value="dificil">${escaparValorFormulario(t().dificil)}</option>
                    </select>
                </label>
            </div>

            <div class="custom-questions-head">
                <div><h3>${escaparValorFormulario(t().questaoTitulo)}</h3><span>${questoes.length} ${estado.idioma === "es" ? "preguntas" : estado.idioma === "en" ? "questions" : "questões"}</span></div>
                <button type="button" id="custom-add-question" class="btn-proxima">${ICONE_UI.plus}<span>${escaparValorFormulario(t().adicionarQuestao)}</span></button>
            </div>
            <div id="custom-question-list" class="custom-question-list">${qCards || `<div class="custom-empty">${escaparValorFormulario(t().semQuestoes)}</div>`}</div>
            <div id="custom-form-message" class="custom-form-message" aria-live="polite"></div>
            <div class="custom-modal-foot">
                <button type="button" class="btn-secundario custom-cancel">${escaparValorFormulario(t().cancelar)}</button>
                <button type="submit" class="btn-proxima">${escaparValorFormulario(t().salvar)}</button>
            </div>
        </form>`,
        materia ? t().editarMateriaTitulo : t().novaMateriaTitulo,
        "wide"
    );

    $("custom-difficulty").value = phaseDraft.difficulty || "normal";
    window.__customPhaseDraft = phaseDraft;

    const form = $("custom-phase-form");
    const preservePhaseDraft = () => {
        phaseDraft.name = $("custom-name").value;
        phaseDraft.category = $("custom-category").value;
        phaseDraft.description = $("custom-description").value;
        phaseDraft.group = $("custom-group").value;
        phaseDraft.difficulty = $("custom-difficulty").value;
    };
    form.addEventListener("submit", (ev) => { ev.preventDefault(); salvarMateriaPeloEditor(phaseDraft); });
    $("custom-add-question").addEventListener("click", () => { preservePhaseDraft(); editarQuestaoCustom(phaseDraft, null, () => mostrarEditorFase(phaseDraft)); });
    form.querySelector(".custom-cancel").addEventListener("click", fecharCustomModal);
    form.querySelectorAll("[data-q-edit]").forEach((b) => b.addEventListener("click", () => { preservePhaseDraft(); editarQuestaoCustom(phaseDraft, Number(b.dataset.qEdit), () => mostrarEditorFase(phaseDraft)); }));
    form.querySelectorAll("[data-q-dup]").forEach((b) => b.addEventListener("click", () => {
        const index = Number(b.dataset.qDup);
        preservePhaseDraft();
        phaseDraft.questions.splice(index + 1, 0, JSON.parse(JSON.stringify(phaseDraft.questions[index])));
        renderDraftToEditor(phaseDraft);
    }));
    form.querySelectorAll("[data-q-del]").forEach((b) => b.addEventListener("click", () => {
        preservePhaseDraft();
        phaseDraft.questions.splice(Number(b.dataset.qDel), 1);
        renderDraftToEditor(phaseDraft);
    }));
}

function renderDraftToEditor(draft) {
    mostrarEditorFase(draft);
    window.__customPhaseDraft = draft;
}

function salvarMateriaPeloEditor(draft) {
    const name = $("custom-name").value.trim();
    const category = $("custom-category").value.trim();
    const description = $("custom-description").value.trim();
    const group = $("custom-group").value.trim();
    const difficulty = $("custom-difficulty").value;
    const message = $("custom-form-message");

    if (!name) {
        message.textContent = t().camposObrigatorios;
        $("custom-name").focus();
        return;
    }
    if (!Array.isArray(draft.questions) || !draft.questions.length) {
        message.textContent = t().semQuestoes;
        return;
    }

    draft.name = name;
    draft.category = category;
    draft.description = description;
    draft.group = group;
    draft.difficulty = difficulty;

    CustomPhases.save(draft);
    fecharCustomModal();
    mostrarMaterias();
}

function editarQuestaoCustom(draft, index, done) {
    const q = index === null ? {
        grupo: "", nome: "", descricao: "", alvo: "", pergunta: "", resposta: "", incompativeis: [],
        grupoPT: "", nomePT: "", descricaoPT: "", alvoPT: "", perguntaPT: "", respostaPT: "", incompativeisPT: []
    } : JSON.parse(JSON.stringify(draft.questions[index]));

    const errPT = Array.isArray(q.incompativeisPT) ? q.incompativeisPT : [];
    const errES = Array.isArray(q.incompativeis) ? q.incompativeis : [];

    customModalBase(`
        <form id="custom-question-form" class="custom-form">
            <div class="custom-grid">
                <label>${escaparValorFormulario(t().questaoTitulo)} / ${estado.idioma === "pt" ? "Tema" : estado.idioma === "en" ? "Topic" : "Tema"}
                    <input id="q-nome" placeholder="${escaparValorFormulario(window.SimunusI18n.t("common", "exampleBones"))}" value="${escaparValorFormulario(q.nomePT || q.nome)}">
                </label>
                <label>${escaparValorFormulario(t().grupoQuestao)}
                    <input id="q-grupo" placeholder="${escaparValorFormulario(window.SimunusI18n.t("common", "exampleSkeleton"))}" value="${escaparValorFormulario(q.grupoPT || q.grupo)}">
                </label>
                <label class="custom-full">${escaparValorFormulario(t().enunciadoPT)} *
                    <textarea id="q-pergunta-pt" placeholder="${escaparValorFormulario(window.SimunusI18n.t("common", "exampleQuestion"))}" required>${escaparValorFormulario(q.perguntaPT || q.pergunta)}</textarea>
                </label>
                <label>${escaparValorFormulario(t().respostaPT)} *
                    <input id="q-resposta-pt" placeholder="${escaparValorFormulario(window.SimunusI18n.t("common", "exampleAnswer"))}" required value="${escaparValorFormulario(q.respostaPT || q.resposta)}">
                </label>
                <label>${escaparValorFormulario(t().explicacaoPT)}
                    <textarea id="q-desc-pt" placeholder="${escaparValorFormulario(window.SimunusI18n.t("common", "exampleExplanation"))}">${escaparValorFormulario(q.descricaoPT || q.descricao)}</textarea>
                </label>
                <label>${escaparValorFormulario(t().alvoPT)}
                    <input id="q-alvo-pt" placeholder="${escaparValorFormulario(window.SimunusI18n.t("common", "exampleObjective"))}" value="${escaparValorFormulario(q.alvoPT || q.alvo)}">
                </label>

                <div class="custom-full custom-alternativas-editor">
                    <div class="custom-field-title">${escaparValorFormulario(t().alternativasErradas)}</div>
                    <div class="alternativas-custom-grid">
                        ${[1,2,3,4].map((number, i) => `
                            <label class="alternativa-custom-field">
                                <span>${number}</span>
                                <input id="q-inc-${i}-pt" placeholder="${["Patela", "Frontal", "Piramidal", "Vértebra"][i]}" value="${escaparValorFormulario(errPT[i] || "")}" maxlength="300">
                            </label>`).join("")}
                    </div>
                    <small class="custom-help">${escaparValorFormulario(t().alternativasErradasAjuda)}</small>
                </div>
            </div>
            <div class="custom-modal-foot">
                <button type="button" class="btn-secundario custom-cancel">${escaparValorFormulario(t().cancelar)}</button>
                <button type="submit" class="btn-proxima">${escaparValorFormulario(t().salvar)}</button>
            </div>
        </form>`,
        t().questaoTitulo,
        "wide",
        () => mostrarEditorFase(draft)
    );

    $("custom-question-form").addEventListener("submit", (ev) => {
        ev.preventDefault();
        const get = (id) => $(id).value.trim();
        const req = ["q-pergunta-pt", "q-resposta-pt"];
        if (req.some((id) => !$(id).value.trim())) {
            return;
        }

        const readAlternatives = (suffix) => [0,1,2,3]
            .map((n) => get(`q-inc-${n}-${suffix}`))
            .filter(Boolean);

        const nq = {
            grupo: get("q-grupo"), nome: get("q-nome"), descricao: q.descricao || get("q-desc-pt"), alvo: q.alvo || get("q-alvo-pt"),
            pergunta: q.pergunta || get("q-pergunta-pt"), resposta: q.resposta || get("q-resposta-pt"),
            incompativeis: Array.isArray(q.incompativeis) && q.incompativeis.length ? q.incompativeis : readAlternatives("pt"),
            grupoPT: get("q-grupo"), nomePT: get("q-nome"), descricaoPT: get("q-desc-pt"), alvoPT: get("q-alvo-pt"),
            perguntaPT: get("q-pergunta-pt"), respostaPT: get("q-resposta-pt"),
            incompativeisPT: readAlternatives("pt")
        };

        if (index === null) draft.questions.push(nq);
        else draft.questions[index] = nq;
        fecharCustomModal();
        done();
    });

    $("custom-question-form").querySelector(".custom-cancel").addEventListener("click", () => mostrarEditorFase(draft));
}

/*
 * ROADMAP — busca avançada (NÃO IMPLEMENTADA)
 * Se o volume de fases/questões justificar, avaliar PostgreSQL Full-Text Search
 * + pg_trgm (preferência inicial no Supabase) ou motor externo de busca
 * como Meilisearch / OpenSearch / Elasticsearch.
 * Requisitos: pesquisa por relevância, tolerância a erros, acentos,
 * paginação, limites de requisições, custos e índices adequados.
 * Nunca expor credenciais privilegiadas, questões protegidas ou registros
 * de outros usuários: autenticação, RLS/autorização e filtragem de acesso
 * devem ser verificadas no backend antes de devolver resultados.
 * A pesquisa local atual permanece ativa; esta anotação não ativa serviços.
 */
let customLibraryQuery = "";
let customLibraryOrder = "recent";
// Após um arrasto, preservar a ordem definida pelo usuário até ele escolher outra ordenação.
let customLibraryDraggedOrder = false;
let customLibraryFilter = "todas";
function mostrarListaFasesCustom(filtro="todas", registrarHistorico = true) {
    mostrarTela(telaListaFasesCustom, registrarHistorico);
    const all = CustomPhases.getAllSubjects().sort((a,b) => (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0) || String(a.createdAt).localeCompare(String(b.createdAt)));
    if (registrarHistorico) { customLibraryFilter = filtro; customLibraryQuery = ""; }
    filtro = customLibraryFilter;
    const normalizeSearch = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
    const terms = normalizeSearch(customLibraryQuery.trim()).split(/\s+/).filter(Boolean);
    const materiasCustom = all.filter(m => (filtro === "arquivadas" ? m.archived : !m.archived) &&
        (filtro !== "favoritas" || m.favorite) &&
        terms.every(term => [m.name,m.description,m.category,m.group].some(value => normalizeSearch(value).includes(term))));
    if (customLibraryOrder === "recent" && !customLibraryDraggedOrder) materiasCustom.sort((a,b) => {
        const ta = Date.parse(a.createdAt || "") || 0;
        const tb = Date.parse(b.createdAt || "") || 0;
        return tb - ta || (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0);
    });
    if (customLibraryOrder === "oldest") materiasCustom.sort((a,b) => {
        const ta = Date.parse(a.createdAt || "") || 0;
        const tb = Date.parse(b.createdAt || "") || 0;
        return ta - tb || (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0);
    });
    if (customLibraryOrder === "az") materiasCustom.sort((a,b) => String(a.name).localeCompare(String(b.name), estado.idioma));
    if (customLibraryOrder === "za") materiasCustom.sort((a,b) => String(b.name).localeCompare(String(a.name), estado.idioma));
    if (customLibraryOrder === "most") materiasCustom.sort((a,b) => b.questions.length - a.questions.length);
    if (customLibraryOrder === "least") materiasCustom.sort((a,b) => a.questions.length - b.questions.length);
    $("custom-library-search").value = customLibraryQuery;
    $("custom-library-order").value = customLibraryOrder;
    $("custom-library-count").textContent = `${materiasCustom.length} ${estado.idioma === "pt" ? (materiasCustom.length === 1 ? "fase encontrada" : "fases encontradas") : estado.idioma === "es" ? "fases encontradas" : "phases found"}`;
    // Arquivadas é uma tela exclusiva; seus registros não aparecem como filtro da biblioteca.
    const filterBar = document.querySelector(".custom-library-filters");
    if (filterBar) filterBar.hidden = filtro === "arquivadas";
    document.querySelectorAll("[data-library-filter]").forEach(btn => {
        const active = btn.dataset.libraryFilter === filtro;
        btn.classList.toggle("is-active", active); btn.setAttribute("aria-pressed", String(active));
    });
    $("titulo-lista-fases-custom").textContent = filtro === "arquivadas" ? (estado.idioma === "en" ? "Archived" : estado.idioma === "es" ? "Archivadas" : "Arquivadas") : (estado.idioma === "pt" ? "Minhas Fases" : t().minhasMaterias);
    $("subtitulo-lista-fases-custom").textContent = filtro === "arquivadas" ? (estado.idioma === "en" ? "Restore or manage your archived phases." : estado.idioma === "es" ? "Restaura o administra tus fases archivadas." : "Restaure ou gerencie suas fases arquivadas.") : t().abrirListaSubtitulo;
    const container = $("custom-screen-list");
    const empty = $("custom-screen-empty");
    const star = `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    const grip = `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>`;
    const more = `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>`;
    // Ícones Lucide inline para ações do menu (sem dependência externa).
    const menuIcon = {
        edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z"/></svg>`,
        duplicate: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>`,
        archive: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v12h14V8M10 12h4"/></svg>`,
        restore: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v12h14V8M12 17v-6m-3 3 3-3 3 3"/></svg>`,
        delete: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m5 4v6m4-6v6"/></svg>`
    };
    container.innerHTML = materiasCustom.map(m => `
        <article class="custom-manage-card custom-library-card" data-phase-id="${escaparValorFormulario(m.id)}" role="button" tabindex="0" aria-label="${escaparValorFormulario(window.SimunusI18n.t("common", "openPhase"))}: ${escaparValorFormulario(m.name)}">
            <div class="custom-library-main">
                <button type="button" class="custom-drag-handle" data-drag="${escaparValorFormulario(m.id)}" aria-label="${escaparValorFormulario(window.SimunusI18n.t("common", "reorderPhase"))}" title="${escaparValorFormulario(window.SimunusI18n.t("common", "dragReorder"))}">${grip}</button>
                <div class="custom-library-info"><h3>${escaparValorFormulario(m.name)}</h3><p>${escaparValorFormulario(m.description || m.category || "")}</p><small>${m.questions.length} ${estado.idioma === "es" ? "preguntas" : estado.idioma === "en" ? "questions" : m.questions.length === 1 ? "questão" : "questões"}</small></div>
                <button type="button" class="custom-library-icon ${m.favorite ? "is-favorite" : ""}" data-fav="${escaparValorFormulario(m.id)}" aria-label="${escaparValorFormulario(t().favorito)}" aria-pressed="${m.favorite}">${star}</button>
                <div class="custom-library-menu-wrap"><button type="button" class="custom-library-icon" data-menu="${escaparValorFormulario(m.id)}" aria-label="${escaparValorFormulario(window.SimunusI18n.t("common", "moreOptions"))}" aria-expanded="false">${more}</button>
                    <div class="custom-library-menu" hidden>
                        <button type="button" data-edit="${escaparValorFormulario(m.id)}">${menuIcon.edit}<span>${escaparValorFormulario(t().editar)}</span></button>
                        <button type="button" data-dup="${escaparValorFormulario(m.id)}">${menuIcon.duplicate}<span>${escaparValorFormulario(t().duplicar)}</span></button>
                        <button type="button" data-archive="${escaparValorFormulario(m.id)}">${m.archived ? menuIcon.restore : menuIcon.archive}<span>${m.archived ? (estado.idioma === "en" ? "Restore" : estado.idioma === "es" ? "Restaurar" : "Restaurar") : (estado.idioma === "en" ? "Archive" : estado.idioma === "es" ? "Archivar" : "Arquivar")}</span></button>
                        <button type="button" class="custom-library-danger" data-del="${escaparValorFormulario(m.id)}">${menuIcon.delete}<span>${escaparValorFormulario(t().excluir)}</span></button>
                    </div>
                </div>
            </div>
        </article>`).join("");
    empty.hidden = Boolean(materiasCustom.length);
    empty.textContent = t().semMaterias;
    $("custom-screen-create").hidden = filtro === "arquivadas";
    const reorderIds = (source, target) => {
        if (!source || !target || source === target) return;
        const ids = all.map(m => m.id);
        const from = ids.indexOf(source), to = ids.indexOf(target);
        if (from < 0 || to < 0) return;
        ids.splice(to, 0, ids.splice(from, 1)[0]);
        if (CustomPhases.reorder(ids)) mostrarListaFasesCustom(filtro, false);
    };
    container.querySelectorAll("[data-phase-id]").forEach(card => {
        card.addEventListener("click", event => {
            if (event.target.closest("button, .custom-library-menu")) return;
            if (filtro !== "arquivadas") iniciarMateriaPersonalizada(card.dataset.phaseId);
        });
        card.addEventListener("keydown", event => {
            if (event.target !== card || !["Enter", " "].includes(event.key)) return;
            event.preventDefault();
            if (filtro !== "arquivadas") iniciarMateriaPersonalizada(card.dataset.phaseId);
        });
    });
    container.querySelectorAll("[data-edit]").forEach(b => b.addEventListener("click", () => mostrarEditorFase(b.dataset.edit)));
    container.querySelectorAll("[data-fav]").forEach(b => b.addEventListener("click", () => { CustomPhases.toggleFavorite(b.dataset.fav); mostrarListaFasesCustom(filtro, false); }));
    container.querySelectorAll("[data-archive]").forEach(b => b.addEventListener("click", () => { CustomPhases.setArchived(b.dataset.archive, !CustomPhases.getById(b.dataset.archive)?.archived); mostrarListaFasesCustom(filtro, false); }));
    container.querySelectorAll("[data-dup]").forEach(b => b.addEventListener("click", () => { CustomPhases.duplicate(b.dataset.dup); mostrarListaFasesCustom(filtro, false); }));
    container.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => { if (confirm(t().confirmarExcluirMateria)) { CustomPhases.remove(b.dataset.del); mostrarListaFasesCustom(filtro, false); mostrarMaterias(); } }));
    container.querySelectorAll("[data-menu]").forEach(b => b.addEventListener("click", () => {
        const menu = b.nextElementSibling, opening = menu.hidden;
        container.querySelectorAll(".custom-library-menu").forEach(el => el.hidden = true);
        container.querySelectorAll("[data-menu]").forEach(el => el.setAttribute("aria-expanded", "false"));
        menu.hidden = !opening; b.setAttribute("aria-expanded", String(opening));
    }));
    // Etapa 119: sortable list with a stable pointer-capture target. The old
    // implementation captured the handle inside a card being moved in the DOM;
    // reparenting that card triggered lostpointercapture and cancelled the drop.
    let drag = null;
    let pendingDrag = null;
    let suppressCardClick = false;
    const cards = () => [...container.querySelectorAll(":scope > [data-phase-id]")];
    const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animateReflow = before => {
        if (!motionAllowed) return;
        cards().forEach(item => {
            if (drag && item === drag.card) return;
            const previous = before.get(item);
            if (!previous) return;
            const dy = previous.top - item.getBoundingClientRect().top;
            if (Math.abs(dy) < 1) return;
            item.getAnimations().forEach(animation => animation.cancel());
            item.animate([{transform:`translateY(${dy}px)`}, {transform:"translateY(0)"}],
                {duration:230, easing:"cubic-bezier(.22,1,.36,1)"});
        });
    };
    const finishDrag = commit => {
        if (!drag) return;
        const d = drag;
        drag = null;
        try { if (container.hasPointerCapture(d.pointerId)) container.releasePointerCapture(d.pointerId); } catch (_) {}
        d.ghost.remove();
        d.card.classList.remove("custom-sort-placeholder");
        document.body.classList.remove("custom-sort-active");
        const visibleIds = cards().map(item => item.dataset.phaseId);
        const changed = visibleIds.some((id,index) => id !== d.originalIds[index]);
        if (!commit || !changed) {
            const lookup = new Map(cards().map(item => [item.dataset.phaseId, item]));
            d.originalIds.forEach(id => { if (lookup.has(id)) container.appendChild(lookup.get(id)); });
            return;
        }
        const visible = new Set(visibleIds);
        let next = 0;
        const reordered = all.map(item => item.id).map(id => visible.has(id) ? visibleIds[next++] : id);
        customLibraryDraggedOrder = true;
        if (CustomPhases.reorder(reordered)) mostrarListaFasesCustom(filtro, false);
        else mostrarListaFasesCustom(filtro, false);
    };
    // A short click opens the phase; holding the card activates sorting.
    // Capture the pointer only after activation, never on an ordinary click.
    const clearPendingDrag = () => {
        if (!pendingDrag) return;
        clearTimeout(pendingDrag.timer);
        pendingDrag = null;
    };
    const activateDrag = pending => {
        if (pendingDrag !== pending || drag || !pending.card.isConnected) return;
        clearPendingDrag();
        const card = pending.card;
        const rect = card.getBoundingClientRect();
        const ghost = card.cloneNode(true);
        ghost.classList.add("custom-sort-ghost");
        ghost.removeAttribute("role"); ghost.removeAttribute("tabindex");
        ghost.setAttribute("aria-hidden", "true");
        ghost.querySelectorAll("button").forEach(button => button.tabIndex = -1);
        Object.assign(ghost.style, {position:"fixed", left:`${rect.left}px`, top:`${rect.top}px`,
            width:`${rect.width}px`, height:`${rect.height}px`, margin:"0",
            pointerEvents:"none", zIndex:"9999"});
        document.body.appendChild(ghost);
        card.classList.add("custom-sort-placeholder");
        document.body.classList.add("custom-sort-active");
        drag = {card, ghost, pointerId:pending.pointerId, startX:pending.x, startY:pending.y,
            offsetX:pending.x-rect.left, offsetY:pending.y-rect.top,
            originalIds:cards().map(item=>item.dataset.phaseId), moved:false};
        try { container.setPointerCapture(pending.pointerId); }
        catch (_) { finishDrag(false); }
    };
    container.addEventListener("pointerdown", event => {
        if (event.button !== 0 || drag || cards().length < 2 || !(customLibraryOrder === "recent" || customLibraryDraggedOrder) || customLibraryQuery.trim()) return;
        if (event.target.closest("button, .custom-library-menu, a, input, select, textarea")) return;
        const card = event.target.closest("[data-phase-id]");
        if (!card || card.parentElement !== container) return;
        clearPendingDrag();
        const pending = {card, pointerId:event.pointerId, x:event.clientX, y:event.clientY, timer:null};
        pendingDrag = pending;
        pending.timer = setTimeout(() => activateDrag(pending), 220);
    });
    container.addEventListener("pointermove", event => {
        if (pendingDrag && pendingDrag.pointerId === event.pointerId &&
            Math.hypot(event.clientX-pendingDrag.x, event.clientY-pendingDrag.y) > 16) clearPendingDrag();
        if (!drag || drag.pointerId !== event.pointerId) return;
        const d = drag;
        if (Math.hypot(event.clientX-d.startX,event.clientY-d.startY) > 5) d.moved = true;
        if (!d.moved) return;
        d.ghost.style.left = `${event.clientX-d.offsetX}px`;
        d.ghost.style.top = `${event.clientY-d.offsetY}px`;
        // Use the dragged card's center, not the pointer's exact position,
        // to make neighboring cards slide naturally as it crosses midpoints.
        const movingCenter = event.clientY - d.offsetY + d.ghost.getBoundingClientRect().height/2;
        const siblings = cards().filter(item => item !== d.card);
        const target = siblings.find(item => movingCenter < item.getBoundingClientRect().top + item.getBoundingClientRect().height/2);
        const before = new Map(cards().map(item => [item, item.getBoundingClientRect()]));
        if (target) container.insertBefore(d.card, target);
        else container.appendChild(d.card);
        animateReflow(before);
    });
    container.addEventListener("pointerup", event => {
        if (pendingDrag && pendingDrag.pointerId === event.pointerId) clearPendingDrag();
        if (!drag || drag.pointerId !== event.pointerId) return;
        const moved = drag.moved;
        finishDrag(true);
        // Suppress the synthetic click after any activated drag, even if the
        // pointer barely moved. Ordinary short clicks remain untouched.
        suppressCardClick = true;
        setTimeout(() => { suppressCardClick = false; }, 150);
    });
    container.addEventListener("pointercancel", () => { clearPendingDrag(); finishDrag(false); });
    container.addEventListener("lostpointercapture", () => { if (drag) finishDrag(false); });
    container.addEventListener("click", event => {
        if (suppressCardClick) { event.preventDefault(); event.stopImmediatePropagation(); suppressCardClick = false; }
    }, true);

}

function abrirTelaSuasFases(registrarHistorico = true) {
    mostrarTela(telaSuasFases, registrarHistorico);
}

function executarAcaoSuasFases(action) {
    if (action === "create") mostrarEditorFase();
    else if (action === "archived") mostrarListaFasesCustom("arquivadas");
    else mostrarListaFasesCustom("todas");
}

function atualizarTextosSuasFases() {
    $("texto-suas-fases").textContent = t().suasMaterias;
    $("titulo-suas-fases").textContent = t().suasFasesTitulo;
    $("subtitulo-suas-fases").textContent = t().suasFasesSubtitulo;
    $("voltar-suas-fases").setAttribute("aria-label", ui().back);
    $("voltar-suas-fases").title = ui().back;
    $("tela-acao-criar").textContent = t().criarMateria;
    $("tela-acao-criar-desc").textContent = t().criarSubtitulo;
    $("tela-acao-lista").textContent = t().minhasMaterias;
    $("tela-acao-lista-desc").textContent = t().abrirListaSubtitulo;
    $("tela-acao-arquivadas").textContent = estado.idioma === "en" ? "Archived" : estado.idioma === "es" ? "Archivadas" : "Arquivadas";
    $("tela-acao-arquivadas-desc").textContent = estado.idioma === "en" ? "Restore and manage saved phases." : estado.idioma === "es" ? "Restaura y administra fases guardadas." : "Consulte e restaure fases arquivadas.";
    $("custom-screen-create").innerHTML = `${ICONE_UI.plus}<span>${escaparHTML(t().criarMateria)}</span>`;
    $("voltar-lista-fases-custom").setAttribute("aria-label", ui().back);
    $("voltar-lista-fases-custom").title = ui().back;
}

function reiniciarQuestionario() {
    iniciarQuestionario();
}

async function reiniciarSimuladoSupabase() {
    const atual = estado.simuladoSupabase;
    const contexto = atual?.activityInfo || {};

    if (contexto.source === "academic_phase" && contexto.topicId) {
        estado.resultadoSupabase = null;
        const attemptId = await window.SimunusApi.startOrResumeAcademicPhase(
            String(contexto.topicId)
        );
        await carregarTentativaSupabase(attemptId, contexto);
        return;
    }

    if (!atual?.simulationId) return;

    const simulado = {
        simulation_id: atual.simulationId,
        title: atual.title || "Simulado",
        description: atual.description || "",
        code: atual.code || ""
    };

    estado.resultadoSupabase = null;
    await prepararSimuladoSupabase(simulado);
}

// Relato de questão: utiliza o mesmo texto/ID já renderizado no balão.
let idQuestaoRelatada = null;
const reportModal = $("modal-relatar-questao");
const reportTextarea = $("texto-relato-questao");
function finalizarFechamentoRelatoQuestao() {
    if (!reportModal) return;
    reportModal.classList.remove("relato-modal-fechando");
    reportModal.classList.add("escondido");
    reportModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("relato-modal-aberto");
}

function fecharRelatoQuestao() {
    if (!reportModal || reportModal.classList.contains("escondido")) return;
    const conteudoRelato = reportModal.querySelector(".relato-modal");
    if (!conteudoRelato) {
        finalizarFechamentoRelatoQuestao();
        return;
    }
    // O modal permanece montado e visível durante os 800ms.
    conteudoRelato.classList.remove("relato-modal-abrindo");
    conteudoRelato.classList.remove("relato-modal-fechando");
    void conteudoRelato.offsetWidth;
    conteudoRelato.classList.add("relato-modal-fechando");
}
$("abrir-relato-questao")?.addEventListener("click", () => {
    idQuestaoRelatada = $("tipo-questao").textContent.trim() || null;
    $("relato-id-questao").textContent = idQuestaoRelatada || "—";
    reportTextarea.value = "";
    $("feedback-relato-questao").textContent = "";
    reportModal.classList.remove("escondido");
    reportModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("relato-modal-aberto");

    // A animação pertence à abertura, não ao carregamento da página.
    // Reiniciamos a animação no mesmo clique, sem delay ou timer.
    const conteudoRelato = reportModal.querySelector(".relato-modal");
    if (conteudoRelato) {
        conteudoRelato.classList.remove("relato-modal-fechando");
        conteudoRelato.classList.remove("relato-modal-abrindo");
        void conteudoRelato.offsetWidth;
        conteudoRelato.classList.add("relato-modal-abrindo");
    }

    reportTextarea.focus();
});
$("fechar-relato-questao")?.addEventListener("click", fecharRelatoQuestao);
reportModal?.querySelector(".relato-modal")?.addEventListener("animationend", (event) => {
    if (event.animationName === "relatoModalSaida" && event.currentTarget.classList.contains("relato-modal-fechando")) {
        finalizarFechamentoRelatoQuestao();
    }
});
reportModal?.addEventListener("click", (event) => {
    if (event.target === reportModal) fecharRelatoQuestao();
});
$("form-relato-questao")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const relato = {
        id_da_questao: idQuestaoRelatada,
        texto_da_reclamacao: reportTextarea.value.trim(),
        data: new Date().toISOString(),
        usuario: null
    };
    if (!relato.texto_da_reclamacao) {
        reportTextarea.focus();
        return;
    }
    // Evento local preparado para futura integração; nenhum backend é chamado.
    document.dispatchEvent(new CustomEvent("simunus:question-report", { detail: relato }));
    $("feedback-relato-questao").textContent = window.SimunusI18n.t("common", "reportPrepared");
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && reportModal && !reportModal.classList.contains("escondido")) fecharRelatoQuestao();
});

$("proxima").addEventListener("click", async () => {
    if (estado.simuladoSupabase && estado.perguntaAtual >= estado.perguntas.length - 1) {
        if (sessaoEstudo.modo === "review" && estado.perguntas.some(q => !q.answered)
            && !window.confirm(textoRevisaoSupabase().confirm)) return;
        await finalizarSimuladoSupabase();
        return;
    }
    estado.perguntaAtual++;

    if (estado.perguntaAtual < estado.perguntas.length) {
        if (estado.simuladoSupabase) {
            mostrarPerguntaSupabase();
        } else {
            mostrarPergunta();
        }
        return;
    }

    if (estado.simuladoSupabase) {
        await finalizarSimuladoSupabase();
    } else {
        finalizar();
    }
});

$("reiniciar").addEventListener("click", async () => {
    if (sessaoEstudo.modo === "review") {
        abrirDashboard();
    } else if (estado.simuladoSupabase) {
        await reiniciarSimuladoSupabase();
    } else {
        reiniciarQuestionario();
    }
});
$("marcar-questao")?.addEventListener("click", alternarMarcacaoQuestao);
$("revisar-erros-sessao")?.addEventListener("click", () => {
    abrirDashboard();
    const painel = $("conteudo-modo-revisao");
    if (painel) painel.hidden = false;
    $("abrir-modo-revisao")?.setAttribute("aria-expanded", "true");
    $("abrir-modo-revisao")?.classList.add("is-open");
    iniciarModoRevisao("wrong");
});
$("proxima-fase-resultado")?.addEventListener("click", async () => {
    const botao = $("proxima-fase-resultado");
    const contexto = estado.simuladoSupabase?.activityInfo;
    if (botao.disabled || botao.hidden || contexto?.source !== "academic_phase"
        || sessaoEstudo.modo === "review") return;
    botao.disabled = true;
    try {
        // Revalidar a disponibilidade antes de iniciar a próxima tentativa.
        estado.catalogoAcademico = null;
        await carregarCatalogoAcademico();
        const proxima = proximaFaseAcademica(contexto);
        if (!proxima) {
            botao.hidden = true;
            return;
        }
        abrirMateriaAcademica(contexto.areaId);
        await iniciarFaseAcademica(proxima, null);
    } catch (erro) {
        console.error("[Supabase] Falha ao abrir próxima fase.", erro);
    } finally {
        botao.disabled = false;
    }
});
$("voltar-idioma").addEventListener("click", voltarTelaAnterior);
$("voltar-materias").addEventListener("click", voltarTelaAnterior);
$("voltar-fases").addEventListener("click", voltarTelaAnterior);

$("abrir-pesquisa-materias")?.addEventListener("click", abrirPesquisaMaterias);
$("fechar-pesquisa-materias")?.addEventListener("click", () => fecharPesquisaMaterias(true));
$("campo-pesquisa-materias")?.addEventListener("input", (event) => {
    const valor = event.target.value;
    clearTimeout(temporizadorPesquisa);
    temporizadorPesquisa = setTimeout(() => {
        renderizarListaDeMaterias(valor);
    }, 100);
});
$("campo-pesquisa-materias")?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") fecharPesquisaMaterias(true);
});

$("abrir-pesquisa-fases")?.addEventListener("click", abrirPesquisaFases);
$("fechar-pesquisa-fases")?.addEventListener("click", () => fecharPesquisaFases(true));
let temporizadorPesquisa = null;
$("campo-pesquisa-fases")?.addEventListener("input", (event) => {
    const valor = event.target.value;
    clearTimeout(temporizadorPesquisa);
    temporizadorPesquisa = setTimeout(() => {
        renderizarListaDeFases(valor);
    }, 100);
});
$("campo-pesquisa-fases")?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") fecharPesquisaFases(true);
});

document.querySelectorAll("[data-idioma]").forEach((botao) => {
    botao.addEventListener("click", () => selecionarIdioma(botao.dataset.idioma));
});

document.querySelectorAll(".botao-tema:not([data-language-trigger])").forEach((botao) => {
    botao.addEventListener("click", () => {
        alternarTema();
        atualizarConfiguracoes();
    });
});

$("botao-materias-boas")?.addEventListener("click", abrirDashboard);
$("botao-continuar")?.addEventListener("click", continuarAtividadeSupabase);
$("dashboard-explorar-materias")?.addEventListener("click", mostrarMaterias);
$("dashboard-suas-fases")?.addEventListener("click", abrirTelaSuasFases);
$("abrir-dashboard-materias")?.addEventListener("click", voltarTelaAnterior);
$("abrir-dashboard-fases")?.addEventListener("click", voltarTelaAnterior);
$("dashboard-voltar-boas")?.addEventListener("click", voltarTelaAnterior);
$("abrir-modo-revisao")?.addEventListener("click", () => {
    const content = $("conteudo-modo-revisao");
    const button = $("abrir-modo-revisao");
    if (!content || !button) return;
    const aberto = content.hidden;
    content.hidden = !aberto;
    button.setAttribute("aria-expanded", String(aberto));
    button.classList.toggle("is-open", aberto);
});
document.querySelectorAll("[data-review-mode]").forEach((button) => button.addEventListener("click", () => iniciarModoRevisao(button.dataset.reviewMode)));
$("quantidade-revisao")?.addEventListener("change", () => {
    atualizarControleQuantidadeRevisao();
});
$("quantidade-revisao-personalizada")?.addEventListener("input", atualizarControleQuantidadeRevisao);
for (const [id, delta] of [["review-minus", -1], ["review-plus", 1]]) {
    $(id)?.addEventListener("click", () => {
        const input = $("quantidade-revisao-personalizada");
        input.value = String(Math.max(1, Math.min(Number(input.max), Number(input.value) + delta)));
        atualizarControleQuantidadeRevisao();
    });
}
$("iniciar-revisao-supabase")?.addEventListener("click", confirmarInicioRevisaoSupabase);

$("alternar-tema-config").addEventListener("click", () => {
    alternarTema();
    atualizarConfiguracoes();
});

let telaOrigemConfiguracoes = null;

function abrirTelaConfiguracoes(origem = null) {
    const telasNavegaveis = [
        telaAcesso, telaCadastro, telaIdioma, telaAcessoPendente, telaRenovarPlano, telaBoasVindas, telaDashboard, telaMaterias,
        telaSuasFases, telaListaFasesCustom, telaFases, telaJogo
    ].filter(Boolean);
    telaOrigemConfiguracoes = origem || telasNavegaveis.find((tela) => tela.classList.contains("tela-visivel")) || telaBoasVindas;
    atualizarConfiguracoes();
    mostrarTela(telaConfiguracoes);
}

$("abrir-configuracoes").addEventListener("click", () => abrirTelaConfiguracoes(telaBoasVindas));
$("abrir-configuracoes-boas")?.addEventListener("click", () => abrirTelaConfiguracoes(telaBoasVindas));
$("dashboard-configuracoes")?.addEventListener("click", () => abrirTelaConfiguracoes(telaDashboard));

$("voltar-configuracoes").addEventListener("click", voltarTelaAnterior);

$("slider-fonte")?.addEventListener("input", (event) => aplicarFonte(event.target.value));
document.querySelectorAll(".botao-idioma-config").forEach((botao) => {
    botao.addEventListener("click", () => window.SimunusI18n.setManual(botao.dataset.configIdioma));
});

$("abrir-suas-fases").addEventListener("click", abrirTelaSuasFases);
$("voltar-suas-fases").addEventListener("click", voltarTelaAnterior);
$("voltar-lista-fases-custom").addEventListener("click", voltarTelaAnterior);
$("custom-screen-create").addEventListener("click", () => mostrarEditorFase());
$("custom-library-search").addEventListener("input", event => {
    customLibraryQuery = event.target.value;
    mostrarListaFasesCustom(customLibraryFilter, false);
    $("custom-library-search").focus();
    $("custom-library-search").setSelectionRange(customLibraryQuery.length, customLibraryQuery.length);
});
$("custom-library-order").addEventListener("change", event => { customLibraryOrder = event.target.value; customLibraryDraggedOrder = false; mostrarListaFasesCustom(customLibraryFilter, false); });
document.querySelectorAll("[data-library-filter]").forEach(button => button.addEventListener("click", () => {
    customLibraryFilter = button.dataset.libraryFilter; mostrarListaFasesCustom(customLibraryFilter, false);
}));
document.addEventListener("pointerdown", event => {
    const container = $("custom-screen-list");
    if (!container || event.target.closest(".custom-library-menu-wrap")) return;
    container.querySelectorAll(".custom-library-menu").forEach(menu => { menu.hidden = true; });
    container.querySelectorAll("[data-menu]").forEach(button => button.setAttribute("aria-expanded", "false"));
});

document.querySelectorAll("[data-custom-screen-action]").forEach((botao) => botao.addEventListener("click", () => executarAcaoSuasFases(botao.dataset.customScreenAction)));
document.addEventListener("keydown", (event) => { if(event.key === "Escape" && !$("custom-phases-layer").hidden) {
    if ($("custom-question-form")) mostrarEditorFase(window.__customPhaseDraft);
    else fecharCustomModal();
} });

// Listeners de autenticação: registrados uma única vez, fora das funções de tema.
$("formulario-acesso").addEventListener("submit", processarAcesso);
$("email-acesso").addEventListener("input", atualizarEstadoBotaoEntrar);
$("senha-acesso").addEventListener("input", atualizarEstadoBotaoEntrar);
$("esqueci-senha-acesso").addEventListener("click", () => {
    const target = new URL("./recovery.html", location.href);
    target.searchParams.set("lang", estado.idioma || "pt");
    location.assign(target.href);
});
$("alternar-modo-acesso").addEventListener("click", abrirCadastro);
iniciarTelefoneCadastro();
$("formulario-cadastro").addEventListener("submit", processarCadastro);
$("voltar-login-cadastro").addEventListener("click", voltarParaLoginCadastro);
$("confirmar-senha-cadastro").addEventListener("input", () => {
    $("mensagem-confirmar-senha").textContent = "";
    $("confirmar-senha-cadastro").removeAttribute("aria-invalid");
});

// Segurança: alteração de senha do usuário autenticado, sem novo sign-in.
const changePasswordLabels = {
    pt: { title:"Redefinir senha", description:"Escolha uma nova senha para sua conta.", newPassword:"Nova senha", confirm:"Confirmar nova senha", cancel:"Cancelar", save:"Salvar nova senha", short:"A senha deve ter entre 8 e 128 caracteres.", mismatch:"As senhas não coincidem.", session:"Sua sessão expirou. Entre novamente.", same:"Escolha uma senha diferente da atual.", reauth:"Sua conta exige uma nova confirmação de identidade antes de alterar a senha.", rate:"Muitas tentativas. Aguarde e tente novamente.", error:"Não foi possível alterar sua senha. Tente novamente.", success:"Senha alterada com sucesso.", close:"Fechar" },
    es: { title:"Restablecer contraseña", description:"Elige una nueva contraseña para tu cuenta.", newPassword:"Nueva contraseña", confirm:"Confirmar nueva contraseña", cancel:"Cancelar", save:"Guardar nueva contraseña", short:"La contraseña debe tener entre 8 y 128 caracteres.", mismatch:"Las contraseñas no coinciden.", session:"Tu sesión ha caducado. Inicia sesión nuevamente.", same:"Elige una contraseña diferente de la actual.", reauth:"Tu cuenta requiere otra verificación de identidad antes de cambiar la contraseña.", rate:"Demasiados intentos. Espera e inténtalo de nuevo.", error:"No se pudo cambiar tu contraseña. Inténtalo de nuevo.", success:"Contraseña actualizada correctamente.", close:"Cerrar" },
    en: { title:"Reset password", description:"Choose a new password for your account.", newPassword:"New password", confirm:"Confirm new password", cancel:"Cancel", save:"Save new password", short:"Password must be between 8 and 128 characters.", mismatch:"Passwords do not match.", session:"Your session has expired. Sign in again.", same:"Choose a password different from your current password.", reauth:"Your account requires identity verification before changing the password.", rate:"Too many attempts. Wait and try again.", error:"Could not update your password. Try again.", success:"Password updated successfully.", close:"Close" }
};
window.SimunusI18n.register("passwordChange", changePasswordLabels);
function redefinirVisibilidadeModalSenha() {
    document.dispatchEvent(new CustomEvent("simunus:reset-password-visibility", {
        detail: { container: $("modal-alterar-senha") }
    }));
}
let senhaModalEmEnvio = false;
let senhaModalReturnFocus = null;
function fecharModalAlterarSenha() {
    if (senhaModalEmEnvio) return;
    const modal = $("modal-alterar-senha");
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    $("form-alterar-senha").reset();
    redefinirVisibilidadeModalSenha();
    $("senha-modal-feedback").textContent = "";
    senhaModalReturnFocus?.focus();
}
$("redefinir-senha-config").addEventListener("click", () => {
    const l = changePasswordLabels[estado.idioma] || changePasswordLabels.pt;
    senhaModalReturnFocus = document.activeElement;
    $("senha-modal-titulo").textContent = l.title;
    $("senha-modal-descricao").textContent = l.description;
    $("label-nova-senha").textContent = l.newPassword;
    $("label-confirmar-nova-senha").textContent = l.confirm;
    $("cancelar-alterar-senha").textContent = l.cancel;
    $("salvar-alterar-senha").textContent = l.save;
    $("fechar-modal-senha").setAttribute("aria-label", l.close);
    $("senha-modal-feedback").textContent = "";
    $("senha-modal-feedback").dataset.kind = "";
    $("form-alterar-senha").reset();
    redefinirVisibilidadeModalSenha();
    $("modal-alterar-senha").hidden = false;
    $("modal-alterar-senha").setAttribute("aria-hidden", "false");
    $("nova-senha-config").focus();
});
$("fechar-modal-senha").addEventListener("click", fecharModalAlterarSenha);
$("cancelar-alterar-senha").addEventListener("click", fecharModalAlterarSenha);
$("modal-alterar-senha").addEventListener("click", event => {
    if (event.target === $("modal-alterar-senha")) fecharModalAlterarSenha();
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !$("modal-alterar-senha").hidden) {
        event.preventDefault();
        fecharModalAlterarSenha();
    }
    if (event.key === "Tab" && !$("modal-alterar-senha").hidden) {
        const nodes = [...$("modal-alterar-senha").querySelectorAll('button:not(:disabled),input:not(:disabled)')];
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
});
$("form-alterar-senha").addEventListener("submit", async event => {
    event.preventDefault();
    if (senhaModalEmEnvio) return;
    const l = changePasswordLabels[estado.idioma] || changePasswordLabels.pt;
    const pass = $("nova-senha-config").value;
    const confirm = $("confirmar-nova-senha-config").value;
    const feedback = $("senha-modal-feedback");
    const show = (message, kind="error") => { feedback.textContent=message; feedback.dataset.kind=kind; };
    if (pass.length < 8 || pass.length > 128) return show(l.short);
    if (pass !== confirm) return show(l.mismatch);
    senhaModalEmEnvio = true;
    $("salvar-alterar-senha").disabled = true;
    $("cancelar-alterar-senha").disabled = true;
    try {
        const result = await Auth.changePassword(pass);
        if (result.ok) {
            $("form-alterar-senha").reset();
            redefinirVisibilidadeModalSenha();
            show(l.success, "success");
        } else {
            const err = {"weak-password":l.short,"no-session":l.session,"same-password":l.same,"reauth-required":l.reauth,"rate-limited":l.rate};
            show(err[result.code] || l.error);
        }
    } finally {
        senhaModalEmEnvio = false;
        $("salvar-alterar-senha").disabled = false;
        $("cancelar-alterar-senha").disabled = false;
    }
});

$("sair-conta").addEventListener("click", async () => {
    await Auth.logout();
    historicoTelas.length = 0;
    estado.materiaId = null;
    limparEstadoDoQuestionario();
    $("mensagem-acesso").textContent = "";
    $("email-acesso").value = "";
    $("senha-acesso").value = "";
    mostrarTela(telaAcesso);
});

// O scroll do usuário não altera a trajetória congelada da transição.
// Se ele ocorrer durante a animação, a camada global é entregue imediatamente
// à âncora real da tela destino, evitando que uma logo fixed fique sobre o conteúdo.
window.addEventListener("scroll", () => {
    const transicao = transicaoLogoAtiva;
    if (!transicao || transicao.id !== navegacaoLogoEmCurso) return;

    transicaoLogoAtiva = null;
    navegacaoLogoEmCurso++;
    cancelarAnimacaoDaLogoGlobal();

    esconderTodasAsLogosAncora();
    mostrarLogoDaTela(transicao.telaDestino);
    limparCamadaGlobalDaLogo();
}, { passive: true });

// Redimensionamento durante uma transição: a animação pode ser cancelada,
 // mas a logo nunca permanece presa à viewport. O target atual reassume o
 // controle normal imediatamente.
window.addEventListener("resize", () => {
    if (!currentLogoAnimation || !globalSimunusLogo) return;

    navegacaoLogoEmCurso++;
    transicaoLogoAtiva = null;
    cancelarAnimacaoDaLogoGlobal();

    const telas = [
        telaAcesso,
        telaCadastro,
        telaIdioma,
        telaAcessoPendente,
        telaRenovarPlano,
        telaBoasVindas,
        telaDashboard,
        telaMaterias,
        telaSuasFases,
        telaListaFasesCustom,
        telaFases,
        telaJogo,
        telaConfiguracoes
    ].filter(Boolean);
    const telaAtual = telas.find((item) => item.classList.contains("tela-visivel"));
    if (!telaAtual) {
        limparCamadaGlobalDaLogo();
        return;
    }

    trocarTelaNormal(telas, telaAtual);
    esconderTodasAsLogosAncora();
    mostrarLogoDaTela(telaAtual);
    limparCamadaGlobalDaLogo();
});

window.SimunusI18n.subscribe(atualizarIdiomaCentral);
carregarDadosEstudo();
carregarTemaSalvo();
acompanharPreferenciaDeTemaDoSistema();
carregarFonteSalva();
atualizarIdiomaDaPagina();
atualizarTextosDeAcesso();
atualizarEstadoBotaoEntrar();
atualizarTextosDaSelecao();
mostrarTela(telaAcesso);
inicializarAplicacaoComAcesso();


/* Criar Simulado — eventos da Etapa 3 */
$("abrir-criar-simulado")?.addEventListener("click", abrirCriarSimulado);

$("voltar-criar-simulado")?.addEventListener("click", () => {
    mostrarMaterias(false);
});

$("criar-simulado-area")?.addEventListener("change", (event) => {
    const s = estado.criarSimulado;
    s.areaId = event.target.value || null;
    s.especialidadeId = null;
    s.topicIds = [];
    s.quantidade = null;
    renderizarEspecialidadesCriarSimulado();
    renderizarTemasCriarSimulado();
    document.querySelectorAll('input[name="question-count"]').forEach((input) => { input.checked = false; });
    atualizarEstadoCriarSimulado();
});

$("criar-simulado-especialidade")?.addEventListener("change", (event) => {
    const s = estado.criarSimulado;
    s.especialidadeId = event.target.value || null;
    s.topicIds = [];
    s.quantidade = null;
    document.querySelectorAll('input[name="question-count"]').forEach((input) => { input.checked = false; });
    renderizarTemasCriarSimulado();
    atualizarEstadoCriarSimulado();
});

$("lista-temas-criar-simulado")?.addEventListener("change", (event) => {
    if (!(event.target instanceof HTMLInputElement) || event.target.type !== "checkbox") return;
    estado.criarSimulado.topicIds = Array.from(
        document.querySelectorAll('#lista-temas-criar-simulado input[type="checkbox"]:checked')
    ).map((input) => input.value);
    atualizarEstadoCriarSimulado();
});

document.querySelectorAll('input[name="question-count"]').forEach((input) => {
    input.addEventListener("change", atualizarEstadoCriarSimulado);
});

document.querySelectorAll('input[name="simulation-mode"]').forEach((input) => {
    input.addEventListener("change", atualizarEstadoCriarSimulado);
});

$("form-criar-simulado")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const s = estado.criarSimulado;
    if (s.iniciando) return;

    atualizarEstadoCriarSimulado();
    if (!s.areaId || !s.especialidadeId || !s.topicIds.length || !s.quantidade || !s.modo) return;
    if (!window.SimunusApi?.isReady?.() || typeof window.SimunusApi?.startCustomSimulationAttempt !== "function") return;

    const botao = $("iniciar-simulado-personalizado");
    const textoOriginal = textosCriarSimulado().start;
    const temas = $("lista-temas-criar-simulado");

    s.iniciando = true;
    s.erro = null;
    if (botao) {
        botao.disabled = true;
        botao.textContent = textosCriarSimulado().starting;
    }

    try {
        // Se a tentativa já foi criada e apenas o carregamento falhou,
        // uma nova submissão reutiliza o mesmo attempt_id.
        let attemptId = s.attemptIdCriado;

        if (!attemptId) {
            attemptId = await window.SimunusApi.startCustomSimulationAttempt(
                [s.areaId],
                [s.especialidadeId],
                [...s.topicIds],
                null,
                s.quantidade,
                s.modo
            );

            if (typeof attemptId !== "string" || !attemptId.trim()) {
                throw new Error("Attempt could not be created.");
            }

            s.attemptIdCriado = attemptId;
        }

        await carregarTentativaSupabase(attemptId, {
            source: "custom",
            simulationId: null,
            mode: s.modo,
            title: textosCriarSimulado().title,
            description: "",
            code: ""
        });

        // O fluxo avançou com sucesso; o attemptId permanece como referência.
    } catch (erro) {
        console.error("[Supabase] Falha ao iniciar simulado personalizado.", erro);
        const mensagemAmigavel =
            window.SimunusApi?.friendlyMessage?.(erro, idiomaBackend())
            || textosCriarSimulado().startError;

        // Se a tentativa já foi criada, não chamamos startCustomSimulationAttempt
        // novamente de forma automática. As seleções permanecem intactas.
        let mensagem = $("mensagem-criar-simulado");
        if (!mensagem) {
            mensagem = document.createElement("p");
            mensagem.id = "mensagem-criar-simulado";
            mensagem.className = "mensagem-fases";
            mensagem.setAttribute("aria-live", "polite");
            $("form-criar-simulado")?.appendChild(mensagem);
        }
        if (mensagem) mensagem.textContent = mensagemAmigavel;
    } finally {
        s.iniciando = false;
        if (botao) botao.textContent = textoOriginal;
        atualizarEstadoCriarSimulado();
    }
});
