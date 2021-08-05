import { messages } from "cucumber-messages";

export type Background = messages.GherkinDocument.Feature.IBackground;
export type Examples = messages.GherkinDocument.Feature.Scenario.Examples;
export type Feature = messages.GherkinDocument.IFeature;
export type FeatureChild = messages.GherkinDocument.Feature.FeatureChild;
export type Scenario = messages.GherkinDocument.Feature.IScenario;
export type Step = messages.GherkinDocument.Feature.Step;
export type Tag = messages.GherkinDocument.Feature.ITag;
export type TableCell = messages.GherkinDocument.Feature.TableRow.TableCell;
export type TableRow = messages.GherkinDocument.Feature.TableRow;
export type ScenarioOutline = Scenario;
export type Envelope = messages.Envelope;
export type Location = messages.ILocation;
