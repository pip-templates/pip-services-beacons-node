// package: beacons_v1
// file: beacons_v1.proto

import * as jspb from "google-protobuf";

export class ErrorDescription extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getCategory(): string;
  setCategory(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getCause(): string;
  setCause(value: string): void;

  getStackTrace(): string;
  setStackTrace(value: string): void;

  getDetailsMap(): jspb.Map<string, string>;
  clearDetailsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorDescription.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorDescription): ErrorDescription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorDescription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorDescription;
  static deserializeBinaryFromReader(message: ErrorDescription, reader: jspb.BinaryReader): ErrorDescription;
}

export namespace ErrorDescription {
  export type AsObject = {
    type: string,
    category: string,
    code: string,
    correlationId: string,
    status: string,
    message: string,
    cause: string,
    stackTrace: string,
    detailsMap: Array<[string, string]>,
  }
}

export class PagingParams extends jspb.Message {
  getSkip(): number;
  setSkip(value: number): void;

  getTake(): number;
  setTake(value: number): void;

  getTotal(): boolean;
  setTotal(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PagingParams.AsObject;
  static toObject(includeInstance: boolean, msg: PagingParams): PagingParams.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PagingParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PagingParams;
  static deserializeBinaryFromReader(message: PagingParams, reader: jspb.BinaryReader): PagingParams;
}

export namespace PagingParams {
  export type AsObject = {
    skip: number,
    take: number,
    total: boolean,
  }
}

export class Beacon extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getSiteId(): string;
  setSiteId(value: string): void;

  getType(): string;
  setType(value: string): void;

  getUdi(): string;
  setUdi(value: string): void;

  getLabel(): string;
  setLabel(value: string): void;

  getCenter(): string;
  setCenter(value: string): void;

  getRadius(): number;
  setRadius(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Beacon.AsObject;
  static toObject(includeInstance: boolean, msg: Beacon): Beacon.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Beacon, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Beacon;
  static deserializeBinaryFromReader(message: Beacon, reader: jspb.BinaryReader): Beacon;
}

export namespace Beacon {
  export type AsObject = {
    id: string,
    siteId: string,
    type: string,
    udi: string,
    label: string,
    center: string,
    radius: number,
  }
}

export class BeaconsPage extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  clearDataList(): void;
  getDataList(): Array<Beacon>;
  setDataList(value: Array<Beacon>): void;
  addData(value?: Beacon, index?: number): Beacon;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BeaconsPage.AsObject;
  static toObject(includeInstance: boolean, msg: BeaconsPage): BeaconsPage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BeaconsPage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BeaconsPage;
  static deserializeBinaryFromReader(message: BeaconsPage, reader: jspb.BinaryReader): BeaconsPage;
}

export namespace BeaconsPage {
  export type AsObject = {
    total: number,
    dataList: Array<Beacon.AsObject>,
  }
}

export class BeaconsPageRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getFilterMap(): jspb.Map<string, string>;
  clearFilterMap(): void;
  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): PagingParams | undefined;
  setPaging(value?: PagingParams): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BeaconsPageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BeaconsPageRequest): BeaconsPageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BeaconsPageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BeaconsPageRequest;
  static deserializeBinaryFromReader(message: BeaconsPageRequest, reader: jspb.BinaryReader): BeaconsPageRequest;
}

export namespace BeaconsPageRequest {
  export type AsObject = {
    correlationId: string,
    filterMap: Array<[string, string]>,
    paging?: PagingParams.AsObject,
  }
}

export class BeaconsPageReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasPage(): boolean;
  clearPage(): void;
  getPage(): BeaconsPage | undefined;
  setPage(value?: BeaconsPage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BeaconsPageReply.AsObject;
  static toObject(includeInstance: boolean, msg: BeaconsPageReply): BeaconsPageReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BeaconsPageReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BeaconsPageReply;
  static deserializeBinaryFromReader(message: BeaconsPageReply, reader: jspb.BinaryReader): BeaconsPageReply;
}

export namespace BeaconsPageReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    page?: BeaconsPage.AsObject,
  }
}

export class BeaconsIdRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getBeaconId(): string;
  setBeaconId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BeaconsIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BeaconsIdRequest): BeaconsIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BeaconsIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BeaconsIdRequest;
  static deserializeBinaryFromReader(message: BeaconsIdRequest, reader: jspb.BinaryReader): BeaconsIdRequest;
}

export namespace BeaconsIdRequest {
  export type AsObject = {
    correlationId: string,
    beaconId: string,
  }
}

export class BeaconReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasBeacon(): boolean;
  clearBeacon(): void;
  getBeacon(): Beacon | undefined;
  setBeacon(value?: Beacon): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BeaconReply.AsObject;
  static toObject(includeInstance: boolean, msg: BeaconReply): BeaconReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BeaconReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BeaconReply;
  static deserializeBinaryFromReader(message: BeaconReply, reader: jspb.BinaryReader): BeaconReply;
}

export namespace BeaconReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    beacon?: Beacon.AsObject,
  }
}

export class BeaconsUdiRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getUdi(): string;
  setUdi(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BeaconsUdiRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BeaconsUdiRequest): BeaconsUdiRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BeaconsUdiRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BeaconsUdiRequest;
  static deserializeBinaryFromReader(message: BeaconsUdiRequest, reader: jspb.BinaryReader): BeaconsUdiRequest;
}

export namespace BeaconsUdiRequest {
  export type AsObject = {
    correlationId: string,
    udi: string,
  }
}

export class BeaconsPositionRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getSiteId(): string;
  setSiteId(value: string): void;

  getUdis(): string;
  setUdis(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BeaconsPositionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BeaconsPositionRequest): BeaconsPositionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BeaconsPositionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BeaconsPositionRequest;
  static deserializeBinaryFromReader(message: BeaconsPositionRequest, reader: jspb.BinaryReader): BeaconsPositionRequest;
}

export namespace BeaconsPositionRequest {
  export type AsObject = {
    correlationId: string,
    siteId: string,
    udis: string,
  }
}

export class BeaconsPositionReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  getPosition(): string;
  setPosition(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BeaconsPositionReply.AsObject;
  static toObject(includeInstance: boolean, msg: BeaconsPositionReply): BeaconsPositionReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BeaconsPositionReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BeaconsPositionReply;
  static deserializeBinaryFromReader(message: BeaconsPositionReply, reader: jspb.BinaryReader): BeaconsPositionReply;
}

export namespace BeaconsPositionReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    position: string,
  }
}

export class BeaconParamsRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  hasBeacon(): boolean;
  clearBeacon(): void;
  getBeacon(): Beacon | undefined;
  setBeacon(value?: Beacon): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BeaconParamsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BeaconParamsRequest): BeaconParamsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BeaconParamsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BeaconParamsRequest;
  static deserializeBinaryFromReader(message: BeaconParamsRequest, reader: jspb.BinaryReader): BeaconParamsRequest;
}

export namespace BeaconParamsRequest {
  export type AsObject = {
    correlationId: string,
    beacon?: Beacon.AsObject,
  }
}

