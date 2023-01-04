import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class TextService {

	private readonly bufferABase64 = (buffer: any) => btoa(String.fromCharCode(...new Uint8Array(buffer)));
	private readonly base64ABuffer = (buffer: any) => Uint8Array.from(atob(buffer), c => c.charCodeAt(0));
	private readonly LENGTH_SAL = 16;
	private readonly INITIALIZATION_VECTOR_LENGTH = this.LENGTH_SAL;

	private readonly pass: string = '123';
	constructor() {}

	private async passwordBasedKeyDerivation(password: string, sal: any, iterations: number, length: number, hash: string, name = 'AES-CBC'): Promise<any> {
		const encoder = new TextEncoder();
		let keyMaterial = await window.crypto.subtle.importKey(
			'raw',
			encoder.encode(password),
			{ name: 'PBKDF2' },
			false,
			['deriveKey']
		);
		return await window.crypto.subtle.deriveKey(
			{
				name: 'PBKDF2',
				salt: encoder.encode(sal),
				iterations,
				hash
			},
			keyMaterial,
			{ name , length },
			false,
			['encrypt', 'decrypt']
		);
	}

	async encryptContent(content: string): Promise<string> {
		const encoder = new TextEncoder();
		const sal = window.crypto.getRandomValues(new Uint8Array(this.LENGTH_SAL));
		const vectorInitialization = window.crypto.getRandomValues(new Uint8Array(this.INITIALIZATION_VECTOR_LENGTH));
		const bufferTextFlat = encoder.encode(content);
		const password = await this.passwordBasedKeyDerivation(this.pass, sal, 100000, 256, 'SHA-256');
		const encrypted = await window.crypto.subtle.encrypt(
			{ name: "AES-CBC", iv: vectorInitialization },
			password,
			bufferTextFlat
		);
		return this.bufferABase64([
			...sal,
			...vectorInitialization,
			...new Uint8Array(encrypted)
		]);
	}

	async decryptContent(content: string): Promise<string> {
		const decoder = new TextDecoder();
		const dataEncrypted = this.base64ABuffer(content);
		const sal = dataEncrypted.slice(0, this.LENGTH_SAL);
		const vectorInitialization = dataEncrypted.slice(0 + this.LENGTH_SAL, this.LENGTH_SAL + this.INITIALIZATION_VECTOR_LENGTH);
		const password = await this.passwordBasedKeyDerivation(this.pass, sal, 100000, 256, 'SHA-256');
		const dataDecryptedAsBuffer = await window.crypto.subtle.decrypt(
			{ name: "AES-CBC", iv: vectorInitialization },
			password,
			dataEncrypted.slice(this.LENGTH_SAL + this.INITIALIZATION_VECTOR_LENGTH)
		);
		return decoder.decode(dataDecryptedAsBuffer);
	}
}
