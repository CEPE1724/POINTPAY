const driveStack = {
    tab: "DriveTab",
    inicio: "Inicio",
    insert: "DriveInsert",
} 

const homeStack = {
    tab: "HomeTab",
    inicio: "Inicio",
    sesion: "Login",
}
 
const registroStack = {
    tab: "RegistroTab",
    inicio: "Registros",
    insert: "RegistroInsert",
    insertCall: "RegistroInsertCall",
    product: "Productos",
}

const terrenoStack = {
    tab: "TerrenoTab",
    inicio: "Terreno",
    insert: "TerrenoInsert",
    search: "TerrenoSearch",
}

export const screen = {
        drive: driveStack,
        home: homeStack,
        registro: registroStack,
        terreno: terrenoStack,

    };
//navigation.navigate(screen.drive.insert);   para viajar en las mismas pantallas o stack
    //navigation.navigate(screen.home.tab, { screen: screen.home.inicio }); para viajar entre diferenets menus de inicio a cuenta y asi 