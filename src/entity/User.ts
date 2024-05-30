import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id!: string;

    @Column({unique: true})
    username!: string;

    @Column()
    password!: string;

    @Column({unique: true})
    email!: string;
}
