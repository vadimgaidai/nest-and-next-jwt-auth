import { Exclude } from 'class-transformer'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: 'varchar',
    unique: true,
  })
  email!: string

  @Column({ type: 'varchar', nullable: true })
  name: string

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  public password?: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
