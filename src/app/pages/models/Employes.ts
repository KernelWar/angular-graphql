export interface Employee {
    id_employee?:  number;
    name?:         string;
    last_name?:    string;
    email?:        string;
    nationality?:  string;
    phone?:        string;
    civil_status?: string;
    birthday?:     string;
}

export interface EmployeeUpdate{
    name: string,
    last_name: string,
    email: string,
    phone: string
}

export interface Graphql {
    data: Data;
}

export interface Data {
    updateEmployee?: Employee
    getEmployeeByKeyword?: Employee[]
    getCountEmployeeByKeyword?: GetCountEmployeeByKeyword[]
}

export interface GetCountEmployeeByKeyword {
    length: number;
}
