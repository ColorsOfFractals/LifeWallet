// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // 🌱 LIFE WALLET WINDOW FACE 003.C
        .setup(|app| {
            use tauri::Manager;

            let icon = app
                .default_window_icon()
                .cloned()
                .expect("Life Wallet default window icon is missing");

            let window = app
                .get_webview_window("main")
                .expect("Life Wallet main window was not found");

            window.set_icon(icon)?;

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
