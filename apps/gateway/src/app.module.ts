import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { handleAuth } from './context/auth.context';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: handleAuth,
      },
      gateway: {
        // allows to customize HTTP req gateway sends to subgraphs
        buildService: ({ url }) => {
          // Propagating headers to subgraphs
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }: any) {
              request.http.headers.set('userId', context.userId);
              // request.http.set('uthorization', context.auth)
              // request.http.set('permissions', context.permissions)
            },
          });
        },
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [{ name: 'idam', url: 'http://localhost:3001/graphql' }],
        }),
      },
    }),
  ],
})
export class AppModule {}
