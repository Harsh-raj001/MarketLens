import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProgressProvider } from "./contexts/ProgressContext";
import { JournalProvider } from "./contexts/JournalContext";
import Home from "./pages/Home";
import LearningLibrary from "./pages/LearningLibrary";
import LearningPath from "./pages/LearningPath";
import Lesson from "./pages/Lesson";
import AITutor from "./pages/AITutor";
import CandlestickExplorer from "./pages/CandlestickExplorer";
import ChartPatternExplorer from "./pages/ChartPatternExplorer";
import IndicatorExplorer from "./pages/IndicatorExplorer";
import TradingDictionary from "./pages/TradingDictionary";
import DailyChallenge from "./pages/DailyChallenge";
import ProgressDashboard from "./pages/ProgressDashboard";
import Fundamentals from "./pages/Fundamentals";
import MarketPsychology from "./pages/MarketPsychology";
import RiskManagement from "./pages/RiskManagement";
import Layout from "./components/Layout";
// Add Journal Pages
import Dashboard from "./pages/journal/Dashboard";
import NewTrade from "./pages/journal/NewTrade";
import TradeDetail from "./pages/journal/TradeDetail";
import WeeklyReview from "./pages/journal/WeeklyReview";
import CalculatorHub from "./pages/CalculatorHub";
import CalculatorStub from "./pages/CalculatorStub";
import MarketLegends from "./pages/MarketLegends";
import InvestmentComparison from "./pages/InvestmentComparison";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Layout><Home /></Layout>
      </Route>
      <Route path="/library">
        <Layout><LearningLibrary /></Layout>
      </Route>
      <Route path="/paths">
        <Layout><LearningPath /></Layout>
      </Route>
      <Route path="/lesson/:id">
        {(params) => <Layout><Lesson {...params} /></Layout>}
      </Route>
      <Route path="/ai-tutor">
        <Layout><AITutor /></Layout>
      </Route>
      <Route path="/candlestick-explorer">
        <Layout><CandlestickExplorer /></Layout>
      </Route>
      <Route path="/chart-patterns">
        <Layout><ChartPatternExplorer /></Layout>
      </Route>
      <Route path="/indicators">
        <Layout><IndicatorExplorer /></Layout>
      </Route>
      <Route path="/dictionary">
        <Layout><TradingDictionary /></Layout>
      </Route>
      <Route path="/daily-challenge">
        <Layout><DailyChallenge /></Layout>
      </Route>
      <Route path="/progress">
        <Layout><ProgressDashboard /></Layout>
      </Route>
      <Route path="/fundamentals">
        <Layout><Fundamentals /></Layout>
      </Route>
      <Route path="/psychology">
        <Layout><MarketPsychology /></Layout>
      </Route>
      <Route path="/risk-management">
        <Layout><RiskManagement /></Layout>
      </Route>
      {/* Journal Routes */}
      <Route path="/journal">
        <Layout><Dashboard /></Layout>
      </Route>
      <Route path="/journal/new">
        <Layout><NewTrade /></Layout>
      </Route>
      <Route path="/journal/trade/:id">
        {(params) => <Layout><TradeDetail {...params} /></Layout>}
      </Route>
      <Route path="/journal/review">
        <Layout><WeeklyReview /></Layout>
      </Route>
      <Route path="/calculator">
        <Layout><CalculatorHub /></Layout>
      </Route>
      <Route path="/calculator-stub">
        <Layout><CalculatorStub /></Layout>
      </Route>
      <Route path="/legends">
        <Layout><MarketLegends /></Layout>
      </Route>
      <Route path="/compare">
        <Layout><InvestmentComparison /></Layout>
      </Route>
      <Route path="/404">
        <NotFound />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <ProgressProvider>
          <JournalProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </JournalProvider>
        </ProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
