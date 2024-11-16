import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "../layouts/PublicLayout/PublicLayout";
import { AdminLayoutComponent } from "../layouts/AdminLayout/AdminLayoutComponent";
import { AuthProvider } from "../context/AuthProvider";
import { Config } from "../pages/Private/user/Config";
import { Login } from "../pages/Public/Login";
import { HomeComponent } from "../pages/Public/Home/HomeComponent";
import { Logout } from "../pages/Private/user/Logout";
import { Profile } from "../pages/Private/user/Profile";
import { Register } from "../pages/Public/Register";
import { UserList } from "../pages/Private/user/UserList";
import { SaveAuthor } from "../pages/Private/autor/SaveAuthor";
import { SaveArticle } from "../pages/Private/article/SaveArticle";
import { ShowArticles } from "../pages/Private/article/ShowArticles";
import { ShowAuthors } from "../pages/Private/autor/ShowAuthors";


export const Routing = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                {/* Componentes publicos */}
                    <Route path="/" element={<PublicLayout />}>
                        <Route index element={<HomeComponent />} />
                        <Route path="login" element={<Login />}/>
                        <Route path="register" element={<Register />} />
                    </Route>
                {/* Componentes privados */}
                    <Route path="/admin" element={<AdminLayoutComponent />}>
                        <Route index element={<Profile />}/>
                        <Route path="profile" element={<Profile />}/>
                        <Route path="update-user" element={<Config />}/>
                        <Route path="logout" element={<Logout />}/>
                        <Route path="user-list" element={<UserList />}/>
                        <Route path="save-author" element={<SaveAuthor />}/>
                        <Route path="save-article" element={<SaveArticle />} />
                        <Route path="list-article" element={<ShowArticles />} />
                        <Route path="list-author" element={<ShowAuthors />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}