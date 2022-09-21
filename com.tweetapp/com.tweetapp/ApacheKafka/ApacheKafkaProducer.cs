using Confluent.Kafka;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace com.tweetapp.ApacheKafka.ApacheKafkaProducer
{
    public class ApacheKafkaProducer:IApacheKafkaProducer
    {
        private readonly ILogger<ApacheKafkaProducer> _logger;
        private readonly IConfiguration _configuration;
        public ApacheKafkaProducer(ILogger<ApacheKafkaProducer> logger,IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }
        public async Task<bool> SendRequest(string topic, string message)
        {
            ProducerConfig config = new ProducerConfig
            {
                BootstrapServers = _configuration.GetSection("ApacheKafka").GetSection("BootstrapServers").Value,
                ClientId = Dns.GetHostName()
            };

            try
            {
                using (var producer = new ProducerBuilder
                <Null, string>(config).Build())
                {
                    var result = await producer.ProduceAsync
                    (topic, new Message<Null, string>
                    {
                        Value = message
                    });

                    _logger.LogInformation($"Delivery Timestamp:{ result.Timestamp.UtcDateTime}");
                    return await Task.FromResult(true);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occured: {ex.Message}");
            }

            return await Task.FromResult(false);
        }
    }
}
