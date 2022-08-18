import { Field, ObjectType, ID, HideField } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => ID)
  id: string;

  @Field({
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt?: Date;

  @Field({
    nullable: true,
    description: 'Identifies the user who created the record',
  })
  createdBy?: string;

  @Field({
    nullable: true,
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updatedAt?: Date;

  @Field({
    nullable: true,
    description: 'Identifies the user who updated the record',
  })
  updatedBy?: string;

  @Field({
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  deletedAt?: Date;

  @Field({
    nullable: true,
    description: 'Identifies the Stringuser who deleted the record',
  })
  deletedBy?: string;

  @Field({
    defaultValue: false,
    description: 'Identifies the object that has been soft deleted.',
  })
  deleted?: boolean;
}
