import { Entity, PrimaryGeneratedColumn,
Column, CreateDateColumn    
} from 'typeorm';

@Entity({name:'MES_WORK_ODERS'})
export class WorkOrder{
@PrimaryGeneratedColumn('uuid')
//uuid 고유한 난수 문자열
id!: string;//! 무조건 존재함을 의미

@Column({type:'varchar2', length:50, unique:true})
orderNo!: string;

@Column({type:'varchar2', length:100})
productName!: string;

@Column({type:'number'})
targetQuantity!: number;

@Column({type:'varchar2', length:20, default:'PENDING'})
status!: string;

@CreateDateColumn()
createdAt!: Date;
}