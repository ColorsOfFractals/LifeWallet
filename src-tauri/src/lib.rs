// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]

#[cfg(target_os = "windows")]
fn install_life_wallet_native_icons(
    window: &tauri::WebviewWindow,
) -> Result<(), Box<dyn std::error::Error>> {
    use std::ffi::OsStr;
    use std::os::windows::ffi::OsStrExt;
    use std::path::PathBuf;

    type Hwnd = isize;
    type Hicon = isize;
    type Handle = isize;

    const IMAGE_ICON: u32 = 1;
    const LR_LOADFROMFILE: u32 = 0x00000010;
    const LR_DEFAULTSIZE: u32 = 0x00000040;

    const WM_SETICON: u32 = 0x0080;
    const ICON_SMALL: usize = 0;
    const ICON_BIG: usize = 1;

    #[link(name = "user32")]
    unsafe extern "system" {
        fn LoadImageW(
            hinst: isize,
            name: *const u16,
            image_type: u32,
            cx: i32,
            cy: i32,
            load: u32,
        ) -> Handle;

        fn SendMessageW(
            hwnd: Hwnd,
            msg: u32,
            wparam: usize,
            lparam: isize,
        ) -> isize;
    }

    let mut icon_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    icon_path.push("icons");
    icon_path.push("icon.ico");

    let wide_path: Vec<u16> = OsStr::new(&icon_path)
        .encode_wide()
        .chain(std::iter::once(0))
        .collect();

    let hwnd = window.hwnd()?.0 as Hwnd;

    unsafe {
        // Windows chooses the appropriate member of the ICO family
        // for each requested optical size.
        let small = LoadImageW(
            0,
            wide_path.as_ptr(),
            IMAGE_ICON,
            32,
            32,
            LR_LOADFROMFILE,
        ) as Hicon;

        if small == 0 {
            return Err("LoadImageW failed for Life Wallet small icon".into());
        }

        let big = LoadImageW(
            0,
            wide_path.as_ptr(),
            IMAGE_ICON,
            64,
            64,
            LR_LOADFROMFILE | LR_DEFAULTSIZE,
        ) as Hicon;

        if big == 0 {
            return Err("LoadImageW failed for Life Wallet big icon".into());
        }

        SendMessageW(
            hwnd,
            WM_SETICON,
            ICON_SMALL,
            small,
        );

        SendMessageW(
            hwnd,
            WM_SETICON,
            ICON_BIG,
            big,
        );
    }

    Ok(())
}

// 🌱 LIFE WALLET NATIVE ICON FAMILY 004.E
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            use tauri::Manager;

            let window = app
                .get_webview_window("main")
                .expect("Life Wallet main window was not found");

            #[cfg(target_os = "windows")]
            install_life_wallet_native_icons(&window)
                .map_err(|error| error.to_string())?;

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
