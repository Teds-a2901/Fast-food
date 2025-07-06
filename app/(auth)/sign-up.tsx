import {View, Text, Button, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {createUser} from "@/lib/appwrite";

const SignUp = () => {
    const [isSubimmiting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({name:"", email: "", password: ""});

    const submit = async () => {
        const {name, email, password} = form;
        if (!name || !email || !password) return Alert.alert("Error", "Please enter a valid email & password");
        setIsSubmitting(true);

        try{
            //Calling Appwrite Sign in Section
            await createUser({name, email, password});
            router.replace("/");
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }finally {
            setIsSubmitting(false);
        }
    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 m-5">
            <CustomInput placeholder="Enter your full name"
                         value={form.name}
                         onChangeText={(text)=>setForm((prev) => ({...prev, name: text}))}
                         label="Name"
                         />

            <CustomInput placeholder="Enter your Email"
                         value={form.email}
                         onChangeText={(text)=>setForm((prev) => ({...prev, email: text}))}
                         label="Email"
                         keyboardType="email-address"/>

            <CustomInput placeholder="Enter your Password"
                         value={form.password}
                         onChangeText={(text)=>setForm((prev) => ({...prev, password: text}))}
                         label="Password"
                         secureTextEntry={true} />
            <CustomButton title="Sign In" isLoading={isSubimmiting} onPress={submit} />
            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className="base-regular text-gray-100">Already have an account?
                </Text>
                <Link href="/sign-in" className="base-bold text-primary">Sign In
                </Link>
            </View>
        </View>
    )
}
export default SignUp
