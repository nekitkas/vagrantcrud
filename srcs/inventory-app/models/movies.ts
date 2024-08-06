import {Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class Movie extends Model {
    @Column({
        type: DataType.STRING
    })
    title!: string;

    @Column(DataType.STRING)
    description!: string;
}