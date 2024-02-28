import axios from 'axios';
import User from '../model/user';
import UserActivity from '../model/userActivity';
import UserAverageSessions from '../model/userAverageSessions';
import UserPerformance from '../model/userPerformance';
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../data/mockedData';
const useMockData = true;

const apiBaseURL = 'http://localhost:3000';

export const getUserInfo = async (userId) => {
  try {
    let userData;
    let user;
    if (useMockData) {
      userData = USER_MAIN_DATA.find(user => user.id === parseInt(userId));
      user = new User(userData);
    } else {
      const response = await axios.get(`${apiBaseURL}/user/${userId}`);
      userData = response.data;
      user = new User(userData.data);
    }
    return user;
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de l'utilisateur", error);
    throw error;
  }
}

export const getUserActivity = async (userId) => {
    try {
      let userActivityData;
      let userActivity;
      if (useMockData) {
        userActivityData = USER_ACTIVITY.find(user => user.userId === parseInt(userId));
        userActivity = new UserActivity(userActivityData);
      } else {
        const response = await axios.get(`${apiBaseURL}/user/${userId}/activity`);
        userActivityData = response.data;
        userActivity = new UserActivity(userActivityData.data);
      }
      return userActivity;
    } catch (error) {
      console.error("Erreur lors de la récupération des données d'activité", error);
      throw error;
    }
}

export const getUserAverageSessions = async (userId) => {
    try {
      let userAverageSessionsData;
      let userAverageSessions;
      if (useMockData) {
        userAverageSessionsData = USER_AVERAGE_SESSIONS.find(user => user.userId === parseInt(userId));
        userAverageSessions = new UserAverageSessions(userAverageSessionsData);
      } else {
        const response = await axios.get(`${apiBaseURL}/user/${userId}/average-sessions`);
        userAverageSessionsData = response.data;
        userAverageSessions = new UserAverageSessions(userAverageSessionsData.data);
      }
      return userAverageSessions;
    } catch (error) {
      console.error("Erreur lors de la récupération des données d'activité", error);
      throw error;
    }
}

export const getUserPerformance = async (userId) => {
  try {
    let userPerformanceData;
    let userPerformance;
    if (useMockData) {
      userPerformanceData = USER_PERFORMANCE.find(user => user.userId === parseInt(userId));
      userPerformance = new UserPerformance(userPerformanceData);
    } else {
      const response = await axios.get(`${apiBaseURL}/user/${userId}/performance`);
      userPerformanceData = response.data;
      userPerformance = new UserPerformance(userPerformanceData.data);
    }
    console.log(userPerformance.kind)
    return userPerformance;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de performance", error);
    throw error;
  }
};