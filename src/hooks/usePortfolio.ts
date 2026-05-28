import { PortfolioData } from '../types/portfolio';
import portfolioData from '../data/portfolio.json';

export const usePortfolio = (): PortfolioData => {
  return portfolioData as PortfolioData;
};
