import { BrowserRouter, Routes } from 'react-router-dom';
import { UserProvider } from './provider/user.context.provider'; 
import './App.css';
import NavBar from './components/nav-bar-component/nav-bar-component';
import RenderRouter from './routers/index';
function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <div id="app">
                    <NavBar />
                    <main className="py-4">
                        <Routes>{RenderRouter()}</Routes>
                    </main>
                </div>
            </BrowserRouter>
        </UserProvider>
    )
}
export default App;