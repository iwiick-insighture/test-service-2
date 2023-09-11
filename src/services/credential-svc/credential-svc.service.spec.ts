import { Test, TestingModule } from '@nestjs/testing';
import { CredentialSvcService } from './credential-svc.service';

describe('CredentialSvcService', () => {
  let service: CredentialSvcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CredentialSvcService],
    }).compile();

    service = module.get<CredentialSvcService>(CredentialSvcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
