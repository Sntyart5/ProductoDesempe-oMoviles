import {Text,View,Colors,Image,BaseInput,Button,} from "react-native-ui-lib";
import { Controller, useForm } from "react-hook-form";
import {ImageBackground} from  "react-native"
import { useState } from "react";
import { TextInput } from "react-native-paper";
import { styles } from "../styles/styles";
import { Usuarios } from "../services/information";
export default function User({ navigation }) {
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name:""
    },
  });

  function UserObject(emailObject, passwordObject, nombreObject) {
    this.email = emailObject;
    this.password = passwordObject;
    this.nombre = nombreObject;
  }

  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [showPass, setShowPass] = useState(false);
  
  function handleSignIn(data) {
    let mailS = data.email;
    let passwordS = data.password;
    var find = Usuarios.filter(({ email, password, nombre }) => {
      return email == mailS && password == passwordS;
    });
    if (find[0]) {
      navigation.navigate("Car");
    }
    else{
      setMessage("no existe ese usuario o la contraseña es incorrecta")
      setColor("red")
    }
  }

  function handleRegister(data) {
    console.log(data);
    let mailS = data.email;
    let passwordS = data.password;
    let nameS=data.name;
    var find = Usuarios.filter(({ email, password, nombre }) => {
      return email == mailS && password == passwordS;
    });
    if (!find[0]) {
      var Usuario = new UserObject(mailS, passwordS, nameS);
      Usuarios.push(Usuario);
      setMessage("usuario creado exitosamente");
      setColor("green");
      console.log(Usuarios);
    } else {
      setMessage("ya hay un usuario con ese email");
      setColor("red");
    }
  }

  return (
    <ImageBackground
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/rentacar-352a0.appspot.com/o/backg.jpeg?alt=media&token=95863422-5dbc-4c23-9aa3-7857c8e18508", // Reemplaza esto con la URL de tu imagen de fondo
      }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >

    <View
      flex
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      >
      <Image
        style={{ height: "9.5rem", width: "9.5rem", borderRadius:100, marginBottom:15}}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/rentacar-352a0.appspot.com/o/user.jpeg?alt=media&token=1d662814-c3b2-4d26-9bc4-3a08e5e4c3b5",
        }}
        ></Image>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern:
          /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
          autoFocus
          label="mail"
          right={<TextInput.Icon icon="email" />}
          onChangeText={onChange}
          value={value}
          ></TextInput>
          )}
          name="email"
          ></Controller>
      {errors.email?.type == "required" && (
        <Text style={{ color: "red" }}>el correo es requerido</Text>
        )}
      {errors.email?.type == "pattern" && (
        <Text style={{ color: "red" }}>debe ingresar un correo</Text>
        )}

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 6,
          maxLength: 15,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
          autoFocus
          style={{ marginTop: 20 }}
          label="Contraseña"
          secureTextEntry={!showPass}
          onChangeText={onChange}
          value={value}
          right={
            <TextInput.Icon
            icon={showPass ? "eye" : "eye-off"}
            onPress={() => setShowPass(!showPass)}
            />
          }
          />
          )}
          name="password"
          ></Controller>
          {errors.password?.type == "required" && (
            <Text style={{ color: "red" }}>la contraseña es requerida</Text>
            )}
      {errors.password?.type == "minLength" && (
        <Text style={{ color: "red" }}>la contraseña debe ser mayor a 6 caracteres</Text>
        )}
         {errors.password?.type =="maxLength" && (
           <Text style={{ color: "red" }}>la contraseña debe ser menor a 12 caracteres</Text>
           )}


<Controller
control={control}
rules={{
  required:true,
  pattern:/^[A-Z]+$/i
}}
render={({ field: { onChange, value } }) => (
  <TextInput
  style={{ marginTop: 20 }}
  label="nombre"
  onChangeText={onChange}
  value={value}
  right={<TextInput.Icon icon="account" />}
/> 
)}
name="name"
>
</Controller>
{errors.name?.type == "required" && (
  <Text style={{ color: "red" }}>el nombre es requerido</Text>
  )}
      {errors.name?.type == "pattern" && (
        <Text style={{ color: "red" }}>solo se aceptan letras</Text>
        )}



     
      <Text style={{ color: `${color}`, textAlign: "center" }}>{message}</Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginTop: "1.875rem",
        }}
        >
        <Button
          label="SignIn"
          style={styles.button}
          icon="login"
          onPress={handleSubmit(handleSignIn)}
          ></Button>
        <Button
          label="Register"
          style={styles.button}
          icon="account"
          onPress={handleSubmit(handleRegister)}
          ></Button>
      </View>
    </View>
  </ImageBackground>
  );
}
