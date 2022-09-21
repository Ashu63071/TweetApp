 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace com.tweetapp.ApacheKafka.ApacheKafkaProducer
{
    public interface IApacheKafkaProducer
    {
        public Task<bool> SendRequest(string topic, string message);
    }
}
