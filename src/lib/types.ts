export enum DbAccessCodeResponse {
    OK,
    OK_NEW_USER,
    CODE_NOT_FOUND,
    CODE_NOT_ACTIVE,
    CODE_EXPIRED,
    UNKNOWN_ERROR,
}

export enum LoginResponse {
    OK,
    AUTH_API_ERROR,
    UNKNOWN_ERROR,
}

export type WelcomeLocalizedStrings = {
    nextPageButton: string,
    previousPageButton: string
    welcomePage: {
        title: string
        question: string
    },
    namePage: {
        title: string
        question: string
        placeholder: string
    },
    accountTypePage: {
        titleWithName: string
        titleWithoutName: string
        optionStudentTitle: string
        optionStudentDescription: string
        optionTeacherTitle: string
        optionTeacherDescription: string
    },
    agePage: {
        title: string
        description: string
        optionNotSpecified: string
        optionTeen: string
        optionYoungAdult: string
        optionAdult: string
        optionElder: string
    },
    experiencePage: {
        title: string
        description: string
        optionBeginner: string
        optionAdvanced: string
        optionSkilled: string
    },
    finalPage: {
        title: string
    }
}