import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Mongoose } from "mongoose";
import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';


export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
    @Prop({required: true})
    name: string
    @Prop({required: true})
    email: string
    @Prop({required: true})
    password: string
    @Prop({required: true, default: "admin"})
    role: string
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

// Encrypt the password
AdminSchema.pre('save', async function(next: mongoose.HookNextFunction){
    try{
        if(!this.isModified('password')){
            return next();
        }
        const hashedPassword = await bcrypt.hash(this['password'], 10);
        this['password'] = hashedPassword;
        return next();
    }catch(err) {
        console.log(err);
    }
})