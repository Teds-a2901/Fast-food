import {
    Dimensions, Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import React from 'react'
import {Redirect, Slot} from "expo-router";
import {images} from "@/constants";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import useAuthStore from "@/store/auth.store";

export default function _Layout() {

    const {isAuthenticated} = useAuthStore();

    if(isAuthenticated)return <Redirect href="/" />

    return (
        <KeyboardAvoidingView>
            {/*behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}*/}
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
               <View className="w-full relative" style={{height: Dimensions.get('screen').height / 2.25}}>
                    <ImageBackground source={images.loginGraphic} className="size-full rounded-b-lg" resizeMode="stretch" />
                    <Image source={images.logo} className="self-center size-48 absolute -bottom-16 z-10" />
               </View>
            <Slot/>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({})
