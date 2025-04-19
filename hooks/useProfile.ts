import { useQuery } from "@tanstack/react-query";
import request from "../api/request";
import useAuth from "./useAuth";

interface IProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  dateOfBirth: string;
  level: number;
  role: "ADMIN" | "USER";
  registrationMethod: "EMAIL" | "GOOGLE";
  createdAt: string;
  updatedAt: string;
  gender: "MALE" | "FEMALE" | "OTHER";
}

const useProfile = () => {
  const { isAuthenticated } = useAuth();

  const r = useQuery({
    queryKey: ["PROFILE"],
    queryFn: async () => {
      const isLoggedIn = await isAuthenticated();
      if (!isLoggedIn) {
        return null;
      }

      const r = await request.get<IProfile>("/users/profile");

      return r;
    },
  });

  return {
    profile: r.data,
    isLoading: r.isLoading,
  };
};

export default useProfile;
