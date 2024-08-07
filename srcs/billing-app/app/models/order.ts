import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Order extends Model {
    @Column(DataType.INTEGER)
    user_id!: number;

    @Column(DataType.INTEGER)
    number_of_items!: number;

    @Column(DataType.DECIMAL)
    total_amount!: number;
}