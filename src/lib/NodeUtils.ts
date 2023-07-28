export enum TriggerType {
	Attack,
	Release,
	AttackRelease,
}

export interface EnvelopeCommand {
	trigger: TriggerType;
	sustain?: number;
}