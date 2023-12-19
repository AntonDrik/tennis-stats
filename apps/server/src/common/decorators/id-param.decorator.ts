import { Param, ParseIntPipe } from "@nestjs/common";

export default (property = 'id') => Param(property, new ParseIntPipe())