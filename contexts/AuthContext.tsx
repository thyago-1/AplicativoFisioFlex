import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: string;
}

interface Paciente {
  id: number;
  altura: number;
  cpf: string;
  endereco: string;
  idade: number;
  peso: number;
  sexo: string;
  telefone: string;
}

interface Profissional {
  id: number;
  nome: string;
  email: string;
  especialidade: string;
  registroProfissional: string;
}

interface AuthContextData {
  user: Usuario | null;
  paciente: Paciente | null;
  profissional: Profissional | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (
    token: string,
    user: Usuario,
    paciente?: Paciente,
    profissional?: Profissional
  ) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storagedToken = await AsyncStorage.getItem('@token');
        const storagedUser = await AsyncStorage.getItem('@user');
        const storagedPaciente = await AsyncStorage.getItem('@paciente');
        const storagedProfissional = await AsyncStorage.getItem('@profissional');

        if (storagedToken && storagedUser) {
          setToken(storagedToken);
          setUser(JSON.parse(storagedUser));
          if (storagedPaciente) {
            setPaciente(JSON.parse(storagedPaciente));
          }
          if (storagedProfissional) {
            setProfissional(JSON.parse(storagedProfissional));
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados do AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const login = async (
    token: string,
    user: Usuario,
    paciente?: Paciente,
    profissional?: Profissional
  ) => {
    setToken(token);
    setUser(user);
    setPaciente(paciente || null);
    setProfissional(profissional || null);

    await AsyncStorage.setItem('@token', token);
    await AsyncStorage.setItem('@user', JSON.stringify(user));

    if (paciente) {
      await AsyncStorage.setItem('@paciente', JSON.stringify(paciente));
    } else {
      await AsyncStorage.removeItem('@paciente');
    }

    if (profissional) {
      await AsyncStorage.setItem('@profissional', JSON.stringify(profissional));
    } else {
      await AsyncStorage.removeItem('@profissional');
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    setPaciente(null);
    setProfissional(null);
    await AsyncStorage.multiRemove([
      '@token',
      '@user',
      '@paciente',
      '@profissional'
    ]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        paciente,
        profissional,
        token,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
