import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column("text")
    public password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name
        this.email = email
        this.password = password
    }
}