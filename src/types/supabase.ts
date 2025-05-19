export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          nome: string;
          email: string;
          senha: string;
          perfil: string;
          clinicaId: number;
          dataCriacao: Date;
        };
        Insert: {
          id?: number;
          nome: string;
          email: string;
          senha?: string;
          perfil?: string;
          clinicaId: number;
          dataCriacao?: Date;
        };
        Update: {
          id?: number;
          nome?: string;
          email?: string;
          senha?: string;
          perfil?: string;
          clinicaId?: number;
          dataCriacao?: Date;
        };
      };
      // Outras tabelas do seu banco de dados...
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
