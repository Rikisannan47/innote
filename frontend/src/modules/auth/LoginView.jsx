import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import {Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import Logo from '../../assets/Insight-Logo.png'

const Login = () => {
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState ('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useContext (AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Por favor completa todos los campos');
            return;
        }

        setIsLoading(true);

        try {
            //Acá llama a la API para obtener el token
            const res= await axios.post('/api/api-token.auth/', {
                username: username,
                password: password,

           });

           const token = res.data.token;

           //Obtener datos del usuario con el token
           const userRes = await axios.get('/api/usuario-actual/', {
            headers: {Authorization: `Token ${token}`}
           });

           const userData = userRes.data;
           login(token, userData);

           //Acá se redirecciona según el rol
           const rol = userRes.data.rol;
           if (rol=== 'admin') navigate ('/admin');
           else if (rol === 'coordinador') navigate('/coordinador');
           else navigate('/asesor');


        } catch (error) {
            setError('Credenciales incorrectas. Por favor verifique su usuario y contraseña');
            console.error('Error en el login', err);
        } finally {
            setIsLoading (false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0F2444, #13294B, #39B54A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
             {/* Card principal */}
             <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                width: '100%',
                maxWidth: '440px',
                padding: '48px 40px',
                position: 'relative',
                overflow: 'hidden'
             }}>

                {/* Decoración Superior */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'linear-gradient(90deg, #39B54A 0%, #0F2444 100%)'
                }}/>

                {/* Logo/Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
                width: '140px',
                height: '80px',
                background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
                borderRadius: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: '0 8px 16px rgba(57, 181, 74, 0.3)'
            }}>
             <img 
                src={Logo}
                alt="Logo Insight"
                style={{
                  width: '120px', // Ajusta según tu logo
                  height: '60px', // Ajusta según tu logo
                  objectFit: 'contain'
                }}
              />
            </div>
          
            <h1 style={{
                color: '#0F2444',
                fontSize: '28px',
                fontWeight: '700',
                margin: '0 0 8px 0'
            }}>Bienvenido</h1>
            
            <p style={{
                color: '#64748B',
                fontSize: '15px',
                margin: 0
            }}>Ingresa tus credenciales para continuar</p>
            </div>

                {/* Alerta de error */}
                {error && (
                <div style={{
                    background: '#FEE2E2',
                    border: '1px solid #FCA5A5',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <AlertCircle size={20} color="#DC2626" />
                    <span style={{ color: '#DC2626', fontSize: '14px', fontWeight: '500' }}>
                    {error}
                    </span>
                </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                {/* Campo Usuario */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                    display: 'block',
                    color: '#0F2444',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px'
                    }}>
                    Usuario
                    </label>
                    <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingresa tu usuario"
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '14px 16px',
                        fontSize: '15px',
                        border: '2px solid #E0E6ED',
                        borderRadius: '10px',
                        background: isLoading ? '#F1F5F9' : '#F9FAFB',
                        color: '#13294B',
                        transition: 'all 0.3s ease',
                        outline: 'none',
                        boxSizing: 'border-box',
                        cursor: isLoading ? 'not-allowed' : 'text'
                    }}
                    onFocus={(e) => {
                        if (!isLoading) {
                        e.target.style.borderColor = '#39B54A';
                        e.target.style.boxShadow = '0 0 0 3px rgba(57, 181, 74, 0.1)';
                        }
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = '#E0E6ED';
                        e.target.style.boxShadow = 'none';
                    }}
                    />
                </div>

                {/* Campo Contraseña */}
                <div style={{ marginBottom: '32px' }}>
                    <label style={{
                    display: 'block',
                    color: '#0F2444',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px'
                    }}>
                    Contraseña
                    </label>
                    <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        disabled={isLoading}
                        style={{
                        width: '100%',
                        padding: '14px 50px 14px 16px',
                        fontSize: '15px',
                        border: '2px solid #E0E6ED',
                        borderRadius: '10px',
                        background: isLoading ? '#F1F5F9' : '#F9FAFB',
                        color: '#13294B',
                        transition: 'all 0.3s ease',
                        outline: 'none',
                        boxSizing: 'border-box',
                        cursor: isLoading ? 'not-allowed' : 'text'
                        }}
                        onFocus={(e) => {
                        if (!isLoading) {
                            e.target.style.borderColor = '#39B54A';
                            e.target.style.boxShadow = '0 0 0 3px rgba(57, 181, 74, 0.1)';
                        }
                        }}
                        onBlur={(e) => {
                        e.target.style.borderColor = '#E0E6ED';
                        e.target.style.boxShadow = 'none';
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isLoading ? '#94A3B8' : '#64748B',
                        transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                        if (!isLoading) e.currentTarget.style.color = '#39B54A';
                        }}
                        onMouseLeave={(e) => {
                        if (!isLoading) e.currentTarget.style.color = '#64748B';
                        }}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    </div>
                </div>

                {/* Botón de Ingresar */}
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                    width: '100%',
                    padding: '16px',
                    background: isLoading ? '#94A3B8' : 'linear-gradient(135deg, #39B54A 0%, #2d943a 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(57, 181, 74, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                    }}
                    onMouseEnter={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(57, 181, 74, 0.4)';
                    }
                    }}
                    onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(57, 181, 74, 0.3)';
                    }}
                >
                    {isLoading ? (
                    <>
                        <div style={{
                        width: '20px',
                        height: '20px',
                        border: '3px solid rgba(255, 255, 255, 0.3)',
                        borderTopColor: '#FFFFFF',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite'
                        }} />
                        <span>Ingresando...</span>
                    </>
                    ) : (
                    <>
                        <LogIn size={20} />
                        <span>Ingresar</span>
                    </>
                    )}
                </button>
                </form>

                {/* Footer */}
               {/* <div style={{
                marginTop: '32px',
                textAlign: 'center',
                paddingTop: '24px',
                borderTop: '1px solid #E0E6ED'
                }}>
                <p style={{
                    color: '#64748B',
                    fontSize: '13px',
                    margin: 0
                }}>
                    ¿Problemas para ingresar?{' '}
                    <a href="#" style={{
                    color: '#39B54A',
                    textDecoration: 'none',
                    fontWeight: '600'
                    }}>
                    Esta es una version de prueba
                    </a>
                </p>
                </div>
                */}
             </div>
        </div>
    );
}

export default Login;